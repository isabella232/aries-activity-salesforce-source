![alt text](/img/logo.png "Aries Integration for Salesforce")

#Aries Integration for Salesforce

This is an integration for [Salesforce](https://www.salesforce.com).


##Configuration

###Username
The username used for authentication on the database.
```javascript
"username": "root",
```

###Password
The password, combined with the security token, associated with the user.
```javascript
"password": "veryinsecure" + "security_token",
```
###table
The name of the SalesForce table to query.

###Inclusion Fields
The fields to include in the results. If null or empty, all fields will be included

###Exclusion Fields
The fields to ignore. Ok to be undefined or null. 


###Example Config
```javascript
{
    username: 'root',
    password: 'veryinsecure' + 'security_token',
    table: 'Campaign',
    inclusionFields: [],
    exclusionFields: ['BillingAddress']
}
```

##Response
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
