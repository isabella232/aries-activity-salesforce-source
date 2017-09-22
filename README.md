![alt text](/img/logo.png "Aries Integration for Salesforce")

# Aries Integration for Salesforce

[![CircleCI](https://circleci.com/gh/aries-data/aries-activity-salesforce-source.svg?style=svg)](https://circleci.com/gh/aries-data/aries-activity-salesforce-source)

This is an integration for [Salesforce](https://www.salesforce.com).
Queries data between executionDate and nextExecutionDate. Paginates by id.
Supports rate limiting and retries with exponential backoff

## Configuration
### Object
`"object": "campaignmember"` - The Salesforce Standard object to pull

### Connection
#### Username
`"username" : "root"` - The username used for authentication on the database.

#### Password
`"password" : "veryinsecure"` - The password associated with the user.

#### Security Token
`"securityToken" : "verysecuretoken"` - The security token associated with the user.

### Example Config
```javascript
{
    connection: {
        username: 'root',
        password: 'veryinsecure',
        securityToken: 'security_token'
    },
    object: 'campaignmember',
}
```

## Response
Outputs an avro file consisting of the records from the SFObject
