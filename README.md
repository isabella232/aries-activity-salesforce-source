# aries-activity-salesforce-source

An aries activity to query the salesforce database using the [Salesforce Object Query Language](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/). 

### Config Format
config.username = email provided to salesforce

config.password = password + security token (ex. passwordABCDEFGH)

config.query = query written in Salesforce Object Query Language


### Usage and Setup
To get started, sign up for an account on the [Salesforce sign up page](https://www.salesforce.com/form/signup/freetrial-sales.jsp). Salesforce will send you a confirmation email, and a link that will confirm your email - clicking on it will let you set a password. To get a security token, click the smiley face on the top right, and select settings. On the left settings bar, you'll find an option named 'Reset My Security Token.' Navigate to that page, and click the 'Reset My Security Token Button.' You'll get an email with your new security token! Use these three fields in the config. 

Your query will use the [Salesforce Object Query Language](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/) (SOQL), which has syntax similar to that of SQL. The query used for testing, `SELECT Id, Name FROM Account`, will fetch all records from the Account table, and return the Id and Name. Salesforce has great docs with their SOQL documentation. 

This aries activity will return the results of the query, to be passed into the next activity.
