import { Activity, singleS3StreamOutput } from 'aries-data';
import jsforce from 'jsforce';
import Query from 'jsforce/lib/query';
import _ from 'lodash';

// TODO: It'd better if jsforce made promises optional. Maybe open a pull request
// remove Promises/A+ implementation so we can await and return Query as a readable stream
delete Query.prototype.then;
delete Query.prototype.thenCall;

export default class SalesforceSource extends Activity {

    @singleS3StreamOutput('json')
    async onTask(activityTask, config, executionDate) {
        const { username, password, securityToken = '' } = config.connection;
        const conn = new jsforce.Connection();
        // connect with username and password
        await conn.login(username, password + securityToken);
        if (config.hasOwnProperty('query')) {
            return this.soqlQueryStream(conn, config);
        }
        return this.queryStream(conn, config);
    }

    async queryStream(conn, { table, inclusionFields, exclusionFields, maxFetch = 10000 }) {
        const fields = await this.getFields(conn, table, inclusionFields, exclusionFields);
        return conn.query({ fields, table }).autoFetch(true).maxFetch(maxFetch);
    }

    async getFields(conn, table, inclusionFields = [], exclusionFields = []) {
        if (_.isEmpty(inclusionFields)) {
            // select all except exclusionFields
            const description = await conn.sobject(table).describe();
            const allFields = description.fields.map(x => x.name);
            return _.difference(allFields, exclusionFields);
        }
        return _.difference(inclusionFields, exclusionFields);
    }

    soqlQueryStream(conn, { query, maxFetch = 10000 }) {
        return conn.query(query).autoFetch(true).maxFetch(maxFetch);
    }
}
