import test from 'blue-tape';
import fs from 'fs';
import nock from 'nock';
import SalesforceSource from '..';
import moment from 'moment';

function getTestConfig() {
	return {
		user: "email_here",
		pass: 'password' + 'security_token'
	}
}


test('proper configuration', t => {
	const activity = new SalesforceSource();
	t.equal(SalesforceSource.props.name, require('../package.json').name);
	t.equal(SalesforceSource.props.version, require('../package.json').version);
	t.end();
});


test('api request', t => async function()  {
	const activity = new SalesforceSource();
	const config = getTestConfig();
	const result = await activity.request(config.user, config.pass, 'SELECT Id, Name FROM Account');
	fs.writeFile('log/log.txt', "Result: " + JSON.stringify(result) + '\n');
	t.ok(result);
}());
