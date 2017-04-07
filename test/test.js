import { assert } from 'chai';
import sinon from 'sinon';
import SalesforceSource from '../lib';
import pkgJson from '../package.json';
import jsforce from 'jsforce';
import nock from 'nock';
import * as fixtures from './fixtures';
import config from './test-config.json';


const URL = `https://astronomer.lightning.force.com/one/one.app`

describe('SalesforceSource', () => {
    describe('#isBulkQuery', function () {
        it('returns true if config.query exists', function () {
            const config = { query: 'select * from table'};
            const source = new SalesforceSource();
            assert(source.isBulkQuery(config) === true);
        });
    });

    describe('#getFields', function () {
        it('requests all available fields if inclusionFields is empty', function () {

        });

        it('takes the difference of inclusionFields and exclusionFields', function () {
            const inclusionFields = ['field1', 'field2'];
            const exclusionFields = ['field2'];
            const expect = ['field1'];
            const actual = //CALL METHOD
        });
    });




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
