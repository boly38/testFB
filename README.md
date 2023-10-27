# testFB

Quickstart to post on FB using FB API
https://developers.facebook.com/docs#apis-and-sdks

* this project requires a page name + page access token
* this project produces 2 curl commands : get page, and post a simple message on a page

## HowTo

### requirements

* nodeJS & curl installed

### context data

You need a **page name**: 
- pick it from page uri : https://facebook.com/myPageNameHere

````bash
# page id
export FB_PAGE_ID=myPageNameHere
````

You need **a valid page access token** :
- to generate a token, use [tools/explorer](https://developers.facebook.com/tools/explorer).
- to verify a token, use [tools/debug/accesstoken](https://developers.facebook.com/tools/debug/accesstoken/) : check scope and expiration date.

````bash
# page access token
export FB_ACCESS_TOKEN=xxxxx
````

You could get back current values :
````bash
# check current env
env|grep FB_
````

or clean them
````bash
unset FB_PAGE_ID FB_ACCESS_TOKEN
````

### usage
````bash
node printCurlCommands
# this app only PRINT curl command
# then copy curl command you want to try
````

WIP : see more info in [code source](./printCurlCommands.js)

---
See also : (failed) [testInsta](https://github.com/boly38/testInsta)