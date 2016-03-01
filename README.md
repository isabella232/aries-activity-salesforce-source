# aries-activity-salesforce-source

Example here: <https://github.com/neyric/mogy-salesforce/blob/master/index.js>

Run this to install dev dependencies:
`npm install --save-dev babel-core babel-polyfill babel-preset-es2015 babel-cli babel-preset-stage-3 blue-tape faucet nock`

Manually add aries to regular dependencies:
"astronomer-aries": "astronomerio/aries"

Manually add the following test command under "scripts":
"test": `DEBUG=aries:* NODE_PATH=. babel-node --presets es2015,stage-3 test/test.js | faucet`

You should now be ready to write some code.

Use [tape](https://github.com/substack/tape) for tests.
We use blue-tape as a wrapper for promise support.
Tests should go under tests/test.js.

Your integration code should live in lib/index.js.

Under the hood, `aries` uses [stampit](https://github.com/stampit-org/stampit) to compose objects.
Most objects exported from `aries` are usually stampit factories.

You can use any npm modules you want, just be sure to `--save` when you `npm install`.

Your integration should be the default export of the module, and should be created
using the exported `activity` object from `aries`, like so:

```
import { activity } from 'astronomer-aries';

export default activity.props({
    config: {
        name: 'activity-name',
        version: 'activity-version',
    },
}).methods({
    async onTask(activityTask, config, lastExecuted) {
        // Your code here.
    },
});
```

The first parameter provided to onTask will be an activityTask, which is the result of an activity poll from (amazon swf)[http://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dg-intro-to-swf.html].

The second parameter provided will be a config object which, in production will come from the configuration users can enter in our web application.  For tests, you mock up whatever input you need to work with the API, and manually pass it to 
onTask.

The third parameter will be the date this activity last ran.

The return value of onTask will be used as the input for the next task.
Usually we upload a file to s3, and return the location of that file for the next activity in
the workflow to use as input.

You should split out the functionality of your integration into smaller pieces,
existing as other methods on your integration.  Everything works best if these
functions are pure and operate purely on their inputs and return some output
that can be tested for in your tests.  The main onTask function should just
be the glue for everything else.
