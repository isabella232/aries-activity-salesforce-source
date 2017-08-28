// Object references - see: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_list.htm
// Primitive data types - see: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_primitives.htm
// Field types - see: https://developer.salesforce.com/docs/atlas.en-us.208.0.object_reference.meta/object_reference/field_types.htm
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
        { name: 'Id', type: 'string' },
        { name: 'AccountNumber', type: ['null', 'string'], default: null },
    ],
});

// some properties have a listed type of currency. salesforce automatically converts currency to
// decimal type which is an arbitrary precision number where you can specify
// the decimal. i'm going with avro type of double and will do the same for
// the remaining schemas.

// reference type suggests a foreign key value. i have went ahead and defaulted to string
// as other id values are (see above). not sure if this is okay. how should we handle this?

// i left type 'picklist' defined in salesforce as blank. it's pretty unclear how we are going
// to define this. i want your opinion. CMD + F 'picklist' in the following link
// https://developer.salesforce.com/docs/atlas.en-us.208.0.object_reference.meta/object_reference/field_types.htm
const campaign = avro.Type.forSchema({
    type: 'record',
    name: 'Campaign',
    fields: [
        { name: 'ActualCost', type: ['null', 'double'] },
        { name: 'AmountAllOpportunities', type: ['null', 'double'] },
        { name: 'AmountWonOpportunities', type: ['null', 'double'] },
        { name: 'BudgetedCost', type: ['null', 'double'] },
        { name: 'CampaignMemberRecordTypeId', type: ['null', 'string'] },
        { name: 'CurrencyIsoCode', type: '' },
        { name: 'Description', type: ['null', 'string'] },
        { name: 'EndDate', type: { type: 'int', logicalType: 'date' } },
        { name: 'ExpectedResponse', type: ['null', 'double'] },
        { name: 'ExpectedRevenue', type: ['null', 'double'] },
        { name: 'HierarchyActualCost', type: ['null', 'double'] },
        { name: 'HierarchyBudgetedCost', type: ['null', 'double'] },
        { name: 'HierarchyExpectedRevenue', type: ['null', 'double'] },
        { name: 'HierarchyNumberSent', type: ['null', 'int'] },
        { name: 'IsActive', type: ['null', 'boolean'] },
        { name: 'LastActivityDate', type: { type: 'int', logicalType: 'date' } },
        { name: 'LastReferencedDate', type: { type: 'int', logicalType: 'date' } },
        { name: 'LastViewedDate', type: { type: 'int', logicalType: 'date' } },
        { name: 'Name', type: ['null', 'string'] },
        { name: 'NumberOfContacts', type: ['null', 'int'] },
        { name: 'NumberOfConvertedLeads', type: ['null', 'int'] },
        { name: 'NumberOfLeads', type: ['null', 'int'] },
        { name: 'NumberOfOpportunities', type: ['null', 'int'] },
        { name: 'NumberOfResponses', type: ['null', 'int'] },
        { name: 'NumberOfWonOpportunities', type: ['null', 'int'] },
        { name: 'NumberSent', type: ['null', 'double'] },
        { name: 'OwnerId', type: ['null', 'string'] },
        { name: 'ParentCampaign', type: ['null', 'string'] },
        { name: 'ParentId', type: ['null', 'string'] },
        { name: 'RecordTypeId', type: ['null', 'string'] },
        { name: 'StartDate', type: { type: 'int', logicalType: 'date' } },
        { name: 'Status', type: '' },
        { name: 'TotalAmountAllOpportunities', type: ['null', 'double'] },
        { name: 'TotalAmountAllWonOpportunities', type: ['null', 'double'] },
        { name: 'TotalNumberofContacts', type: ['null', 'int'] },
        { name: 'TotalNumberofConvertedLeads', type: ['null', 'int'] },
        { name: 'TotalNumberofLeads', type: ['null', 'int'] },
        { name: 'TotalNumberofOpportunities', type: ['null', 'int'] },
        { name: 'TotalNumberofResponses', type: ['null', 'int'] },
        { name: 'TotalNumberofWonOpportunities', type: ['null', 'int'] },
        { name: 'Type', type: '' }
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
