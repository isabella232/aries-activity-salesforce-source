const util = require('util');
const { Readable } = require('stream');
const { streamOutput } = require('ariesjs');
const _ = require('highland');
const moment = require('moment');
const avro = require('avsc');
const rp = require('request-promise-native');
const PromiseThrottle = require('promise-throttle');
const retry = require('retry');
const get = require('lodash.get');
const defaults = require('lodash.defaults');
const parseString = util.promisify(require('xml2js').parseString);

class SalesforceClient {
    constructor(config) {
        this.config = defaults(config, { requestsPerSecond: 1, maxRetries: 10, apiVersion: '40.0' });
        this.instanceUrl = null;
        this.sessionId = null;
        this.limiter = new PromiseThrottle({
            requestsPerSecond: this.config.requestsPerSecond,
            promiseImplementation: Promise,
        });
    }

    getPassword() {
        const { connection } = this.config;
        return connection.password + (connection.securityToken || '');
    }

    async authenticateIfNeeded() {
        // TODO: support oauth2 auth in addition to SOAP auth
        if (!this.instanceUrl || !this.sessionId) {
            console.log('Starting auth');
            const username = this.config.connection.username;
            const password = this.getPassword();
            const options = {
                uri: `https://login.salesforce.com/services/Soap/u/${this.config.apiVersion}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    SOAPAction: 'login',
                },
                body: `
                    <se:Envelope xmlns:se="http://schemas.xmlsoap.org/soap/envelope/">
                        <se:Header/>
                    <se:Body>
                    <login xmlns="urn:partner.soap.sforce.com">
                    <username>${username}</username>
                    <password>${password}</password>
                    </login>
                    </se:Body>
                    </se:Envelope>
                `,
            };

            const response = await parseString(await rp(options));
            // console.log(response);
            const loginResponse = get(response, 'soapenv:Envelope.soapenv:Body.0.loginResponse.0.result.0');
            // console.log(loginResponse);
            const serverUrl = get(loginResponse, 'serverUrl.0');
            this.instanceUrl = serverUrl.slice(0, serverUrl.indexOf('/services/Soap'));
            this.sessionId = get(loginResponse, 'sessionId.0');
            console.log('Authenticated successfully');
        }
    }

    describe(object) {
        return this.limiter.add(this.requestWithRetries.bind(this, `sobjects/${object}/describe`));
    }

    query(query) {
        return this.limiter.add(this.requestWithRetries.bind(this, 'query', { q: query }));
    }

    buildUri(endpoint) {
        return `${this.instanceUrl}/services/data/v${this.config.apiVersion}/${endpoint}`;
    }

    requestWithRetries(endpoint, qs) {
        return new Promise((resolve, reject) => {
            const operation = retry.operation({
                retries: this.config.maxRetries,
            });
            operation.attempt((currentAttempt) => {
                console.log(`Making attempt ${currentAttempt} of ${this.config.maxRetries + 1}.`);
                const options = {
                    uri: this.buildUri(endpoint),
                    qs: {
                        ...qs,
                    },
                    headers: {
                        Authorization: `Bearer ${this.sessionId}`,
                    },
                    json: true,
                };
                rp(options).then((response) => {
                    console.log('Request succeeded');
                    resolve(response);
                }).catch((err) => {
                    console.log(`Request failed: ${err}`);
                    if (!operation.retry(err)) {
                        reject(err);
                    }
                });
            });
        });
    }
}

class SalesforceStream extends Readable {
    constructor(context, config, opts, client) {
        super(opts);
        this.context = context;
        this.config = config;
        this.client = client || new SalesforceClient(config);
        this.lowerDate = moment(this.context.executionDate).format();
        this.upperDate = moment(this.context.nextExecutionDate).format();
        this.fields = null; // all fields of config.object
        this.done = false;
        this.last_id = null;
    }

    getTimestampField() {
        switch (this.config.object) {
            case 'opportunityhistory':
                return 'CreatedDate';
            default:
                return 'LastModifiedDate';
        }
    }

    getIdClause() {
        if (this.last_id) {
            return `and Id > '${this.last_id}'`;
        }
        return '';
    }

    buildQuery() {
        const timestampField = this.getTimestampField();
        const fieldsString = this.fields.join(',');
        return `
        select ${fieldsString} from ${this.config.object}
        where ${timestampField} >= ${this.lowerDate}
        and ${timestampField} < ${this.upperDate}
        ${this.getIdClause()}
        order by Id asc
        `;
    }

    async get() {
        if (this.done) {
            return null;
        }
        await this.client.authenticateIfNeeded();
        if (!this.fields) {
            console.log(`Describing object: ${this.config.object}`);
            const describedObject = await this.client.describe(this.config.object);
            console.log(describedObject);
            const fields = describedObject.fields.map(x => ({ name: x.name, type: x.type }));
            console.log(fields);
            this.fields = describedObject.fields.map(x => x.name);
        }
        const query = this.buildQuery();
        const { totalSize, done, records } = await this.client.query(query);
        this.done = done;
        console.log(`Fetched ${records.length} records of ${totalSize}`);
        if (done && records.length === 0) {
            console.log('done and no records returned');
            return null;
        } else if (done) {
            // we're done and got records back. push them
            console.log('Done. pushing last batch of records');
            return records;
        }
        // not done yet. need to keep paging
        // const timestampField = this.getTimestampField(); // our sort key to page off of
        // this.lowerDate = moment(records[records.length - 1][timestampField]).format();
        this.last_id = records[records.length - 1].Id;
        return records;
    }

    _read() {
        console.log('read called');
        this
        .get()
        .then(this.push.bind(this))
        .catch((err) => {
            console.log(err);
            process.nextTick(this.emit.bind(this, 'error', err));
        });
    }
}

function timestampFields(obj, fields) {
    for (const field of fields) {
        const val = moment(obj[field]);
        if (val.isValid()) {
            obj[field] = val.valueOf();
        } else {
            obj[field] = null;
        }
    }
}

function mapper(config, describedObject) {
    return function (obj) {
        const dateFields = describedObject.fields.filter(x => x.type === 'date' || x.type === 'datetime').map(x => x.name);
        timestampFields(obj, dateFields);
        return obj;
    };
}

const mapping = {
    boolean: 'boolean',
    currency: 'double',
    date: 'long',
    datetime: 'long',
    double: 'double',
    id: 'string',
    int: 'int',
    multipicklist: 'string',
    picklist: 'string',
    reference: 'string',
    string: 'string',
    textarea: 'string',
    url: 'string',
};

function avroField(field) {
    const { name, type, nillable } = field;
    const avroType = mapping[type];
    const fieldObj = {
        name,
        type: nillable ? ['null', avroType] : avroType,
    };
    if (type === 'date' || type === 'datetime') {
        fieldObj.logicalType = 'timestamp-millis';
    }
    return fieldObj;
}

function avroSchemaFromDescribedObject(obj) {
    return avro.Type.forSchema({
        type: 'record',
        name: obj.name,
        fields: obj.fields.filter(x => mapping.hasOwnProperty(x.type)).map(x => avroField(x)),
    });
}

async function source(context, config) {
    // return an avro stream
    // fetch data where updated_after = executionDate and updated_before = nextExecutionDate
    console.log('in activity');
    const client = new SalesforceClient(config);
    await client.authenticateIfNeeded();
    const describedObject = await client.describe(config.object);
    const sfStream = new SalesforceStream(context, config, { objectMode: true }, client);
    sfStream.fields = describedObject.fields.map(x => x.name);
    const stream = _(sfStream);
    const avroSchema = avroSchemaFromDescribedObject(describedObject);
    const encoder = new avro.streams.BlockEncoder(avroSchema, { batchSize: 1, codec: 'deflate' });
    return stream.flatten().map(mapper(config, describedObject)).pipe(encoder);
}

module.exports.source = source;
module.exports.default = streamOutput(source);
