import { assert } from 'chai';
import SalesforceSource from '../lib';
import pkgJson from '../package.json';
import jsforce from 'jsforce';
import nock from 'nock';

describe('SalesforceSource', () => {
    describe('#getBulk', () => {
        it('tests bulk query', () => {
            config = new './test-config';
            if(config.hasOwnProperty("query")){
                console.log(config);
                console.log(config("query"));
            }

        });
    });
});

// function getTestConfig() {
//     return {
//         username: 'username/email',
//         password: 'password security token',
//         table: 'Campaign',
//         inclusionFields: [],
//         exclusionFields: [],
//     };
// }
//
// test('proper configuration', t => {
//     t.equal(SalesforceSource.props.name, pkgJson.name);
//     t.equal(SalesforceSource.props.version, pkgJson.version);
//     t.end();
// });
