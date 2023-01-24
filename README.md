# BUILDING BLOCKS




wrangler d1 execute DB --local --command='SELECT * from property_amenities where property_amenities.isDeleted = 0  and id = 1 '
wrangler d1 execute DB --local --command='SELECT * from property_token'

## ABOUT

BUILDING BLOCKS is open sourced framework to use (any) crypto to manage ownership of a property.


## SETUP


clone BUILDING BLOCKS into your directory

git clone  https://github.com/OrbitLabsDAO/buildingblocksreporting.git 

run  the following 2 commands

`npm install --save-dev @11ty/eleventy`
`npm install `


### Change variables:

open _data/env.js and change the vars to whatever you want.

### create .env

rename _.env to .env to allow dotenv to see the local environment variables 

API = The API is set to the local host but you should change it to your domain route in most cases
SECRET = Change the secret to something else, this is the Key that JWT uses. 
CANCREATEACCOUNT = 1 on 2 off.  This allows you to disable the create account
CLOUDFLAREURL=https://api.cloudflare.com/client/v4/accounts/8851e575353a23f4511fbe2d1a74505e/images/v2/direct_upload
BEARERTOKEN=PbgI1GP3zctBx7U6rV1xlWzdJvzvg64X6EPuZBd9
EMAILAPIURL=http://127.0.0.1:8787
PRODUCTNAME=Building Blocks
ADMINURL=http://localhost:8789/
SENDEREMAILNAME=cryptoskillz
SIGNUPEMAILTEMPLATEID=30429839
FORGOTPASSWORDEMAILTEMPLATEID=30458239
ADMINURL=http://localhost:8789/
SECRET=974this is the stupid secret that no will ever be able to guess344342!
CANCREATEACCOUNT=0
APIURL=http://localhost:8789/api/
COMPLEXPASSWORD=0
RPCURL=https://bsc-dataseed.binance.org
FACTORYCONTRACTADDRESS=0xbf86927f6ce7946608b3e64c91775e4845bc78dd
FACTORYCONTRACTABI=[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_salt","type":"bytes32"}],"name":"deploy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"payable","type":"function"}]
BLOCKCHAINNETWORK=BNB
CRYPTOSALT=fdsfhsjdfhsdufysdufyu8ewyfefwefe
BLOCKEXPLORER=https://testnet.bscscan.com/
NETWORK=testnet
CROWDFUNDURL=http://localhost:8788/
EMAILAPIURL=https://email.cryptoskillz.workers.dev
PRODUCTNAME=Building Blocks
SIGNUPEMAILTEMPLATEID=30429839
SENDEREMAILNAME=cryptoskillz
SIGNUPEMAILTEMPLATEID=30429839
FORGOTPASSWORDEMAILTEMPLATEID=30458239

### Javascript

All the reusable javascript is in /assets/app.js and 
Each file has its js file in _includes ie dashoard.njk has an accompanying _includes/dashboard.js file 


## Building 

The build script is a script you can locally to test the CMS before you deploy it.

`./build.sh local`   

`./build.sh prod`

`./build.sh cypress`

The first command will build a local version the second command will use production api and the cypress will run the tests

Note you will have to modify build.js and add your cypress key and cypress.config.js to add your project it more information can be found here 

https://www.cypress.io/


## API

The API endpoints are all in the functions/API directory

## DEPLOY TO CLOUDFLARE 

create a repo and push the code to it

`git init`

`git remote add cms <GIT URL>`

* Login into Cloudflare and click on workers and set the domain
* Click on KV 
* Click on create namespace give it a name and click add
* Click on pages from the left menu
* Click create the project and connect to git
* Connect your git hub and chose the repo
* Set the framework to eleventy
* Click Deploy

Click on setting and then environment variables and add the following

`	API: the root of your project`
`	SECRET: A secret phrase for JWT`
`	CANCREATEACCOUNT: 1 on 2 off.  This allows you to disable the create account`

Click on functions and scroll down to the KV datastore
click add and add the following details

	`kvdata : <namesapce>`


## USING 


wrangler d1 execute DB --local  --file=./scripts/sql/schema.sql
sudo wrangler d1 execute DB --file=./scripts/sql/schema.sql

## SETTINGS OBJECT

The settings object is what controls the rendering of the index / add and edit pages and its basic structure is as shown below.

 const theSettings = {"checkAdmin":1,"tableSchema":0,"allowOnlyOne":0,"editButton":1,"deleteButton":1,"customButton":"","customSelect":customSelect,"localLookUp":localLookUp,"table":"property","formatFields":""}

### checkAdmin : boolean

This adds a isAdmin = 1 to any SQL query 

### tableSchema : boolean

This returns the table Schema so we can build edit form etc. 

### allowOnlyOne : boolean

This hides or shows the create new button 

### editButton : boolean

Show or hide the edit button

### deleteButton : boolean

Show or hide the delete button

### customButton : HTML

A custom html button that renders out in the actions column it also accepts 3 variabels [id],[name],[counter] which will be replaced with the data

### customSelect : HTML

A custom html select that renders out in the actions column it also accepts 3 variabels [id],[name],[counter] which will be replaced with the data

### localReplace : JSON Object

This will replace data with something that makes more sense ie 0 = no and 1 = yes

example object

    [
        {"field": "state",
        "values": ['0','1','2'],
        "replaceValues": ['Crowdfund','Sold','Rented']},
        {"field": "currentlyRented",
        "values": ['0','1'],
        "replaceValues": ['No','Yes']}
    ]


### table : text

The table to get the data from

formatFields : JSON object

This will call a custom function on a field in the data 

example object

[
{"field":"amountInternational",
"function":"formatCurencyUSD(tmpValue)"}
]

function it calls 

let formatCurencyUSD = (code, digits = 2) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits
    })
    let currency = formatter.format(code)
    return (currency)
}

### foreignKey : foreign id

This function allows us to to get fields that match the level 1 data

### lookUps :JSON object

This function calls the look up endpoint to get the foreign data

example object

[{
    "table":"user",
    "key":"userId",
    "foreignKey":"",
    "value":""
},
{
    "table":"property_token",
    "key":"propertyTokenId",
    "foreignKey":"",
    "value":""
}]

### overRideTitle : Text

hold a new title so we dont use the dynamic one





