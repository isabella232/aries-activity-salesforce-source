// see: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_list.htm
const avro = require('avsc');
// "account
// campaign
// campaignmember
// contact
// lead
// opportunity
// opportunitycontactrole
// opportunityhistory
// profile
// recordtype
// task
// user
// userrole"

const account = avro.Type.forSchema({
    type: 'record',
    name: 'Account',
    fields: [
        { name: 'AccountNumber', type: 'string' },
    ],
});

const campaign = avro.Type.forSchema({
    type: 'record',
    name: 'Campaign',
    fields: [

    ],
});

const campaignmember = avro.Type.forSchema({
    type: 'record',
    name: 'CampaignMember',
    fields: [

    ],
});

const contact = avro.Type.forSchema({
    type: 'record',
    name: 'Contact',
    fields: [

    ],
});

const lead = avro.Type.forSchema({
    type: 'record',
    name: 'Lead',
    fields: [

    ],
});

const opportunity = avro.Type.forSchema({
    type: 'record',
    name: 'Opportunity',
    fields: [

    ],
});

const opportunitycontactrole = avro.Type.forSchema({
    type: 'record',
    name: 'OpportunityContactRole',
    fields: [

    ],
});

const opportunityhistory = avro.Type.forSchema({
    type: 'record',
    name: 'OpportunityHistory',
    fields: [

    ],
});

const profile = avro.Type.forSchema({
    type: 'record',
    name: 'Profile',
    fields: [

    ],
});
const recordtype = avro.Type.forSchema({
    type: 'record',
    name: 'RecordType',
    fields: [

    ],
});

const task = avro.Type.forSchema({
    type: 'record',
    name: 'Task',
    fields: [

    ],
});

const user = avro.Type.forSchema({
    type: 'record',
    name: 'User',
    fields: [

    ],
});

const userrole = avro.Type.forSchema({
    type: 'record',
    name: 'UserRole',
    fields: [

    ],
});

module.exports = {
    account,
    campaign,
    campaignmember,
    contact,
    lead,
    opportunity,
    opportunitycontactrole,
    opportunityhistory,
    profile,
    recordtype,
    task,
    user,
    userrole,
};
