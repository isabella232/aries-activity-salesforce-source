const util = require('util');
const { Readable } = require('stream');
const { streamOutput } = require('ariesjs');
const _ = require('highland');
const avro = require('avsc');
const rp = require('request-promise-native');
const PromiseThrottle = require('promise-throttle');
const retry = require('retry');
const get = require('lodash.get');
const schemas = require('./schemas');
const parseString = util.promisify(require('xml2js').parseString);

class SalesforceClient {
    constructor(config) {
        this.config = config;
        this.serverUrl = null;
        this.sessionId = null;
// [ this.instanceUrl, "services/data", "v" + this.version ].join('/');
    }

    getPassword() {
        const { connection } = this.config;
        return connection.password + (connection.securityToken || '');
    }

    async authenticateIfNeeded() {
        // TODO: support oauth2 auth in addition to SOAP auth
        if (!this.serverUrl || !this.sessionId) {
            const username = this.config.connection.username;
            const password = this.getPassword();
            const options = {
                uri: 'https://login.salesforce.com/services/Soap/u/40.0',
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
        }
    }
}

class SalesforceStream extends Readable {
    constructor(context, config, opts) {
        super(opts);
        this.client = new SalesforceClient(config);
    }

    async get() {
        await this.client.authenticateIfNeeded();
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

function mapper(config) {
    return function (obj) {
        return obj;
    };
}

function source(context, config) {
    // return an avro stream
    // fetch data where updated_after = executionDate and updated_before = nextExecutionDate
    console.log('in activity');
    const stream = _(new SalesforceStream(context, config, { objectMode: true }));
    const avroSchema = schemas[config.object];
    const encoder = new avro.streams.BlockEncoder(avroSchema, { batchSize: 1, codec: 'deflate' });
    return stream.flatten().map(mapper(config)).pipe(encoder);
}

module.exports.source = source;
module.exports.default = streamOutput(source);
