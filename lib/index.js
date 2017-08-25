const { Readable } = require('stream');
const { streamOutput } = require('ariesjs');
const _ = require('highland');
const avro = require('avsc');
const rp = require('request-promise-native');
const PromiseThrottle = require('promise-throttle');
const retry = require('retry');
const schemas = require('./schemas');

class SalesforceClient {

}

class SalesforceStream extends Readable {
    _read() {

    }
}

function mapper(config) {
    return function (obj) {
        return obj;
    };
}

function source(context, config) {
    // return an avro stream
    // fetch data where updated_after = executionDate and updated_before = nextExecutionDate
    console.log('in activity');
    const stream = _(new SalesforceStream(context, config, { objectMode: true }));
    const avroSchema = schemas[config.endpoint];
    const encoder = new avro.streams.BlockEncoder(avroSchema, { batchSize: 1, codec: 'deflate' });
    return stream.flatten().map(mapper(config)).pipe(encoder);
}

module.exports.source = source;
module.exports.default = streamOutput(source);
