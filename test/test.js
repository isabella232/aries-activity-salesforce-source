import { assert } from 'chai';
import SalesforceSource from '../lib';
import pkgJson from '../package.json';
import jsforce from 'jsforce';
import nock from 'nock';
import * as fixtures from './fixtures';
import config from './test-config.json'

const URL = `https://astronomer.lightning.force.com/one/one.app`

describe('SalesforceSource', () => {
    describe('#getQuery', () => {
        it('tests config exists in query', () => {
            const source = new SalesforceSource;
            if(config.hasOwnProperty("query")){
                console.log(config);
                console.log(config.query);
            }
        });
    });

    describe('#getResponse', () => {
        before(function(){
            nock(URL)
            .get(URL)
            .reply('200', fixtures.response);
        });
        it('tests response', () => {
            const source = new SalesforceSource;
            // const data = await index.Query.fields;
            // assert.ok(data);

        });
    });
});
