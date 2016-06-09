import test from 'blue-tape';
import nock from 'nock';
import SalesforceSource from '..';
import { ActivityTester } from 'aries-data';

function getTestConfig() {
    return {
        username: "username/email",
        password: 'password' + 'security token',
        query: 'SELECT_ALL FROM Account'
    }
}


test('proper configuration', t => {
    const activity = new SalesforceSource();
    t.equal(SalesforceSource.props.name, require('../package.json').name);
    t.equal(SalesforceSource.props.version, require('../package.json').version);
    t.end();
});


test('api request', t => async function() {
    const tester = new ActivityTester(SalesforceSource);

    const task = {};
    const config = getTestConfig();

    tester.testS3StreamOutput('test/output', t.equals);
    const result = await tester.onTask(task, config);

    t.ok(result);
}());
