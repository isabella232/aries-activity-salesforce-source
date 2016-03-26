import activity from 'astronomer-aries';
import jsforce from 'jsforce';
import AWS from 'aws-sdk';
import thenify from 'thenify-all';

export default activity.props({
    config: {
        name: require('../package.json').name,
        version: require('../package.json').version,
    },
}).methods({
    async onTask(activityTask, config, lastExecuted) {
        // config format:
        //      config.username = email provided to salesforce
        //      config.password = password + security token (ex. passwordABCDEFGH)
        //      config.query = query written in Salesforce Object Query Language (https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/)


        // get query response
        const queryResponse = await this.request(config.username, config.password, config.query);

        // generate file name
        const key = uuid.v4();

        // results from object -> json file
        const file = JSON.stringify(queryResponse);


        // upload to s3
        const uploadResponse = await this.upload(key, file);

        // return file name
        return uploadResponse.key;
    }, async request(user, pass, q) {

        // create empty connection
        var conn = new jsforce.Connection();

        // connect with username and password
        return conn.login(user, pass).then(function () {
            // run query now that we're logged in
            return conn.query(q).then(function (results) {
                // return results from query
                return results;
            });
        });
    }, async upload(key, body) {
        // Create s3 service.
        const s3 = new AWS.S3({
            region: 'us-east-1'
        });

        // Thenify s3.
        thenify(s3, s3, ['upload']);

        // Create upload params.
        const uploadParams = {
            Bucket: 'astronomer-workflows',
            Key: key,
            Body: body,
        };

        // Upload result.
        return await s3.upload(uploadParams);
    }
});
