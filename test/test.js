import test from 'blue-tape';
import fs from 'fs';
import nock from 'nock';
import salesforce from '..';
import omit from 'lodash.omit';
import moment from 'moment';

function getTestConfig() {
	return {
		user: 'julianlaneve@icloud.com',
		pass: 'Astronomer2016!' + 'wwQYTUAvCMdly88twvfMR4HF'
	}
}


test('proper configuration', t => {
	const activity = salesforce();
	t.equal(activity.config.name, require('../package.json').name);
	t.equal(activity.config.version, require('../package.json').version);
	t.end();
});


test('api request', t => async function () {
	const activity = salesforce();
	const config = getTestConfig();

	const result = await activity.request(config.user, config.pass, 'SELECT Id, Name FROM Account');
	fs.writeFile('log/log.txt', "Result: " + JSON.stringify(result) + '\n');
	t.ok(result);
}());

test('s3 upload', t => async function () {
	const activity = salesforce();

	const key = '12345';
	const body = '{ "salesforce": "data" }';

	// Intercept request.
	const scope = nock('https://astronomer-workflows.s3.amazonaws.com')
		.put(`/${key}`)
		.reply(200);

	const response = await activity.upload(key, body);
	t.equal(response.key, key);
}());
