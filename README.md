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

Your integration should be the default export of the module, and should be created
using the exported `activity` object from `aries`, like so:

```
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
