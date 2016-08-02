import test from 'blue-tape';
import SalesforceSource from '../lib';
import pkgJson from '../package.json';
import nock from 'nock';

const loginNock = nock('https://login.salesforce.com').post('/').reply(200, '<serverUrl>https://na1.salesforce.com/services/Soap/u/37.0</serverUrl>');

function getTestConfig() {
  return {
    username: 'username/email',
    password: 'password security token',
    resourceName: 'Campaign',
    inclusionFields: [],
    exclusionFields: [],
  };
}

test('proper configuration', t => {
  t.equal(SalesforceSource.props.name, pkgJson.name);
  t.equal(SalesforceSource.props.version, pkgJson.version);
  t.end();
});


test('api request', async (t) => {
  nock.emitter.on('no match', (req) => {
      t.comment(JSON.stringify(req));
  });
  const source = new SalesforceSource();
  const config = getTestConfig();

  const result = await source.request(config);

  t.ok();
});
