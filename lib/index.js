import { Activity, singleS3StreamOutput } from 'aries-data';
import jsforce from 'jsforce';
import { Readable } from 'stream';
import _ from 'lodash';

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
    });
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
    const queryResponse = await this.request(config);
    return queryResponse;
  }

  async request(config) {
    const {
        username,
        password,
        resourceName,
        exclusionFields,
    } = config;
    let { inclusionFields } = config;
    const conditions = {};

    const conn = new jsforce.Connection();
    // connect with username and password
    await conn.login(username, password);
    if (_.isEmpty(inclusionFields)) {
      // select all except exclusionFields
      const description = await conn.sobject(resourceName).describe();
      const allFields = description.fields.map(x => x.name);
      inclusionFields = _.difference(allFields, exclusionFields);
    }
    return await new SalesforceStream(conn.sobject(resourceName).find(conditions, inclusionFields));
  }
}
