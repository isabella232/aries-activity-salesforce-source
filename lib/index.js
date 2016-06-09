import { Activity, singleS3FileOutput } from 'aries-data';
import jsforce from 'jsforce';
import AWS from 'aws-sdk';
import thenify from 'thenify-all';

export default class SalesforceSource extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version,
    };

    @singleS3FileOutput()
    async onTask(activityTask, config, lastExecuted) {
        // config format:
        // 		config.username = email provided to salesforce
        // 		config.password = password + security token (ex. passwordABCDEFGH)
        // 		config.query = query written in Salesforce Object Query Language (https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/)


        // get query response
        const queryResponse = await this.request(config.username, config.password, config.query);

        // results from object -> json file
        const file = JSON.stringify(queryResponse);

        return file;
    }
    async request(user, pass, q) {
        // create empty connection
        var conn = new jsforce.Connection();

        // connect with username and password
        return conn.login(user, pass).then(function() {
            if (q.startsWith('SELECT_ALL')) {
                const object = q.split(' ')[2];
                return new Promise((resolve, reject) => {
                    conn.sobject(object).find({}).execute((err, records) => {
                        if (err) { reject(err) }
                        resolve(records);
                    });
                });
            } else {
                // run query now that we're logged in
                return conn.query(q).then(function(results) {
                    // return results from query
                    return results;
                });
            }
        });
    }
    select_all(query) {
        query.split(' ');

    }
};
