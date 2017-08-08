![alt text](/img/logo.png "Aries Integration for Salesforce")

# Aries Integration for Salesforce

[![CircleCI](https://circleci.com/gh/aries-data/aries-activity-salesforce-source.svg?style=svg)](https://circleci.com/gh/aries-data/aries-activity-salesforce-source)

This is an integration for [Salesforce](https://www.salesforce.com).

## Configuration

### Username
`"username" : "root"` - The username used for authentication on the database.

### Password
`"password" : "veryinsecure"` - The password associated with the user.

### Security Token
`"securityToken" : "verysecuretoken"` - The security token associated with the user.

### Query
`"query" : "SELECT Id, Name, BillingCity FROM Account"` - This option overrides table, inclusion, and exclusion fields.  This runs a raw SOQL query.

### Table
`"table" : "accounts"` - The name of the SalesForce table to query.

### Inclusion Fields
`"inclusionFields" : []` - The fields to include in the results. If null or empty, all fields will be included

### Exclusion Fields
`"exclusionFields" : []` - The fields to ignore. If null or empty, no fields will be excluded.

### Max Fetch
`"maxFetch" : 10000` - Maximum number of records to fetch. By default this is set to 10000.

### Example Config
```javascript
{
    username: 'root',
    password: 'veryinsecure' + 'security_token',
    table: 'Campaign',
    inclusionFields: [],
    exclusionFields: ['BillingAddress'],
    maxFetch: 10000
}
```

## Response
The response is the results expected, in JSON format. Example:

```javascript
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLcAAL"
         },
         "Id":"0013600000LVqLcAAL",
         "Name":"GenePoint"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLaAAL"
         },
         "Id":"0013600000LVqLaAAL",
         "Name":"United Oil & Gas, UK"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLbAAL"
         },
         "Id":"0013600000LVqLbAAL",
         "Name":"United Oil & Gas, Singapore"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLSAA1"
         },
         "Id":"0013600000LVqLSAA1",
         "Name":"Edge Communications"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLTAA1"
         },
         "Id":"0013600000LVqLTAA1",
         "Name":"Burlington Textiles Corp of America"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLUAA1"
         },
         "Id":"0013600000LVqLUAA1",
         "Name":"Pyramid Construction Inc."
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLVAA1"
         },
         "Id":"0013600000LVqLVAA1",
         "Name":"Dickenson plc"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLWAA1"
         },
         "Id":"0013600000LVqLWAA1",
         "Name":"Grand Hotels & Resorts Ltd"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLYAA1"
         },
         "Id":"0013600000LVqLYAA1",
         "Name":"Express Logistics and Transport"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLZAA1"
         },
         "Id":"0013600000LVqLZAA1",
         "Name":"University of Arizona"
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLXAA1"
         },
         "Id":"0013600000LVqLXAA1",
         "Name":"United Oil & Gas Corp."
      },
      {  
         "attributes":{  
            "type":"Account",
            "url":"/services/data/v36.0/sobjects/Account/0013600000LVqLdAAL"
         },
         "Id":"0013600000LVqLdAAL",
         "Name":"sForce"
      }
```

## License
MIT
