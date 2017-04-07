import { Activity, singleS3StreamOutput } from 'aries-data';
import jsforce from 'jsforce';
import Query from 'jsforce/lib/query';
import _ from 'lodash';
import pkgJson from '../package.json';

// TODO: It'd better if jsforce made promises optional. Maybe open a pull request
// remove Promises/A+ implementation so we can await and return Query as a readable stream
delete Query.prototype.then;
delete Query.prototype.thenCall;

export default class SalesforceSource extends Activity {

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        const conn = new jsforce.Connection();
        // connect with username and password
        await conn.login(username, password);
        if(config.hasOwnProperty("query")) {
            return conn.bulk.query(config.query).stream();
        } else{
            const {
                username,
                password,
                table,
                inclusionFields = [],
                exclusionFields = [],
            } = config;

            if (_.isEmpty(inclusionFields)) {
                // select all except exclusionFields
                const description = await conn.sobject(table).describe();
                const allFields = description.fields.map(x => x.name);
                inclusionFields.push(...allFields);
            }
            const fields = _.difference(inclusionFields, exclusionFields);
            const queryConfig = {
                fields,
                table,
            };
            return new Query(conn, queryConfig).maxFetch(Number.MAX_SAFE_INTEGER);
        }
    }
}
