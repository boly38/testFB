# testFB

Quickstart to post on FB using FB API
https://developers.facebook.com/docs#apis-and-sdks

* this project requires a page name + page access token (short or long lived one)
* this project produces 2 curl commands : get page, and post a simple message on a page

In addition with an application-id and application-secret, and access token (short or long-lived one) :
* this project produces a curl command to get or recycle long-lived access token

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

By default, a FB login result is a short-lived access-token : expiration is ~1 hour.

To get long-lived access-token, you must call a dedicated API. Long-lived access-token expiration is ~2 months

````bash
# page access token
export FB_ACCESS_TOKEN=xxxxx
````

You could print current FB env values :
````bash
# check current env
env|grep FB_
````

or clean them, for example:
````bash
unset FB_PAGE_ID FB_ACCESS_TOKEN
````

(in option) You need an **application id** and **application secret** in order to get long-lived token:

````bash
export FB_APP_id=0000000
export FB_APP_SECRET=0a0a0a0a0a
````
Nb: pick them from [developers.facebook.com/apps](https://developers.facebook.com/apps/)

### usage
````bash
node printCurlCommands
# this app only SHOWS curl commands 
# then it's up to you to copy/paste curl command you want to try
````

* see more info in [source code](./printCurlCommands.js)

---
See also : (failed) [testInsta](https://github.com/boly38/testInsta)