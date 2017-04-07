import { assert } from 'chai';
import SalesforceSource from '../lib';
import pkgJson from '../package.json';
import jsforce from 'jsforce';
import nock from 'nock';
import config from './test-config.json'

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

    // describe('#getConfig', () => {
    //     it('tests connection', () => {
    //         const conn = new jsforce.Connection();
    //
    //     });
    // });
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
