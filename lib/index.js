import { Activity, singleS3StreamOutput } from 'aries-data';
import jsforce from 'jsforce';
import Query from 'jsforce/lib/query';
import _ from 'lodash';
import highland from 'highland';
import pkgJson from '../package.json';

// TODO: It'd better if jsforce made promises optional. Maybe open a pull request
// remove Promises/A+ implementation so we can await and return Query as a readable stream
delete Query.prototype.then;
delete Query.prototype.thenCall;

export default class SalesforceSource extends Activity {

    constructor() {
        super();
        this.MAX_FETCH = 10000;
    }

    @singleS3StreamOutput('json')
    async onTask(activityTask, config, executionDate) {
        const { username, password, securityToken = '' } = config.connection;
        const conn = new jsforce.Connection();
        // connect with username and password
        await conn.login(username, password + securityToken);
        if (this.isSOQL(config)) {
            return this.soqlQueryStream(conn, config);
        }
        return this.queryStream(conn, config);
    }

    isSOQL(config) {
        return config.hasOwnProperty('query');
    }

    async queryStream(conn, config) {
        const {
            table,
            inclusionFields = [],
            exclusionFields = [],
        } = config;

        const fields = await this.getFields(conn, table, inclusionFields, exclusionFields);
        const queryConfig = {
            fields,
            table,
        };
        return conn.query(queryConfig).autoFetch(true).maxFetch(this.MAX_FETCH);
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

    soqlQueryStream(conn, config) {
        return conn.query(config.query).autoFetch(true).maxFetch(this.MAX_FETCH);
    }
}
