import { Activity, singleS3StreamOutput } from 'aries-data';
import jsforce from 'jsforce';
import Query from 'jsforce/lib/query';
import { Readable } from 'stream';
import _ from 'lodash';
import pkgJson from '../package.json';

class SalesforceStream extends Readable {
    constructor(stream) {
        super({ objectMode: true });

        stream.on('record', (data) => {
            delete data.attributes;
            this.push(data);
        });

        stream.on('error', (error) => {
            this.push(error);
        });

        stream.on('end', () => {
            this.push(null);
        });
    }

    _read() {
        // don't need to do anything because stream is automatically populated
    }
}

export default class SalesforceSource extends Activity {
    static props = {
        name: pkgJson.name,
        version: pkgJson.version,
    };

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        return await this.request(config);
    }

    async request(config) {
        const {
            username,
            password,
            resourceName,
            exclusionFields,
        } = config;
        let { inclusionFields } = config;

        const conn = new jsforce.Connection();
        // connect with username and password
        await conn.login(username, password);
        if (_.isEmpty(inclusionFields)) {
            // select all except exclusionFields
            const description = await conn.sobject(resourceName).describe();
            const allFields = description.fields.map(x => x.name);
            inclusionFields = allFields;
        }
        inclusionFields = _.difference(inclusionFields, exclusionFields);
        const queryConfig = {
            fields: inclusionFields,
            table: resourceName,
        };
        const query = new Query(conn, queryConfig).maxFetch(Number.MAX_SAFE_INTEGER);
        return new SalesforceStream(query);
    }
}
