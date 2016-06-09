import { Activity, singleS3StreamOutput } from 'aries-data';
import jsforce from 'jsforce';
import { Readable } from 'stream';

class SalesforceStream extends Readable {
    constructor(stream) {
        super({ objectMode: true });

        stream.on('record', (data) => {
            this.push(data);
        });

        stream.on('response', (response) => {
            this.push(response);
        });

        stream.on('error', (error) => {
            this.push(error);
        });

        stream.on('end', () => {
            this.push(null);
        })
    }

    _read() {
        // don't need to do anything because stream is automatically populated
    }
}


export default class SalesforceSource extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version,
    };

    @singleS3StreamOutput('json')
    async onTask(activityTask, config, lastExecuted) {

        // get query response
        const queryResponse = await this.request(config.username, config.password, config.query);

        return queryResponse;
    }
    async request(user, pass, q) {
        // create empty connection
        var conn = new jsforce.Connection();

        // connect with username and password
        return new Promise((resolve, reject) => {
            conn.login(user, pass).then(() => {
                if (q.startsWith('SELECT_ALL')) {
                    const object = q.split(' ')[2];
                    resolve(new SalesforceStream(conn.sobject(object).find({})));
                } else {
                    resolve(new SalesforceStream(conn.bulk.query(q)));
                };
            });
        });
    }
}
