//import test from 'blue-tape';
import { assert } from 'chai';
import SalesforceSource from '../lib';
import pkgJson from '../package.json';
import nock from 'nock';

describe('SalesforceSource', () => {
    describe('#getBlah', () => {

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
