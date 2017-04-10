import { assert } from 'chai';
import sinon from 'sinon';
import SalesforceSource from '../lib';

describe('SalesforceSource', () => {
    describe('#isBulkQuery', function () {
        it('returns true if config.query exists', function () {
            const config = { query: 'select * from table'};
            const source = new SalesforceSource();
            assert(source.isBulkQuery(config) === true);
        });
    });

    describe('#getFields', function () {
        it('requests all available fields if inclusionFields is empty', async function () {
            //arrange
            const source = new SalesforceSource();
            const mockFields = [{name: 'users'}, {name: 'accounts'}];
            const description = { fields: mockFields };
            const describePromise = new Promise(resolve => resolve(description));
            const describeFn = sinon.stub().returns(describePromise);
            const sobject = {
                describe: describeFn
            };
            const sobjectFn = sinon.stub().returns(sobject);
            const conn = {
                sobject: sobjectFn
            };
            const table = 'users';
            //act
            const fields = await source.getFields(conn, table);
            //assert
            assert.deepEqual(fields, ['users', 'accounts']);
        });

        it('takes the difference of inclusionFields and exclusionFields', async function () {
            //arrange
            const inclusionFields = ['field1', 'field2'];
            const exclusionFields = ['field2'];
            const table = 'users';
            const source = new SalesforceSource();
            //act
            const actual = await source.getFields(null, table, inclusionFields, exclusionFields);
            const expected = ['field1'];
            assert.deepEqual(actual, expected);
        });
    });
});
