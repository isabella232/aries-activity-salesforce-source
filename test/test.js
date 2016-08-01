import test from 'blue-tape';
import SalesforceSource from '..';
import { ActivityTester } from 'aries-data';

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
  t.equal(SalesforceSource.props.name, require('../package.json').name);
  t.equal(SalesforceSource.props.version, require('../package.json').version);
  t.end();
});


test('api request', async (t) => {
  const tester = new ActivityTester(SalesforceSource);

  const task = {};
  const config = getTestConfig();

  tester.testS3StreamOutput('test/output', t.equals);
  const result = await tester.onTask(task, config);

  t.ok(result);
});
