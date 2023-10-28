const { exit, env } = require('node:process');

// overall docs: https://developers.facebook.com/docs#apis-and-sdks
const version = env.FB_API_VERSION || "v18.0";// get latest version from https://developers.facebook.com/docs/graph-api or /tools/explorer
const FB_GRAPH_AP_URL= `https://graph.facebook.com/${version}`;

//~ page id:
const page_id = env.FB_PAGE_ID;// from page uri : https://facebook.com/<page_id_here> // aka. Page-scoped ID or PSID in doc?

//~ application access token:
const accessToken = env.FB_ACCESS_TOKEN;
// on-line generate access token and test API : https://developers.facebook.com/tools/explorer
// debug access token : https://developers.facebook.com/tools/debug/accesstoken/ // IMPORTANT to check access token expiration/type/scope
// ==> Page access token > expiration: 1 hour
// ==> User access token > expiration: 1 hour
// ==> cf. get long-lived token to get 60 days expiration

// get your application id/secret from https://developers.facebook.com/apps/
//~ application id
const app_id = env.FB_APP_ID;
//~ application secret
const app_secret = env.FB_APP_SECRET;

const isSet = value => value !== undefined && value !== null && value !== "";
const notice = () => console.log("\n [i] curl command : warn about carriage return when copy past command\n")
const logCurlCommand = cmd => console.log(`\n${cmd}\n\n`);

// https://developers.facebook.com/docs/graph-api/reference/page/#Reading
const getPageInfo = (page_id, accessToken) => {// user OR page token is required
    console.log(` * GET [page-info] :`)
    const shortUrl = `/${page_id}`;
    const fullUrl = `${FB_GRAPH_AP_URL}${shortUrl}?access_token=${accessToken}`;
    const curlCommand = `curl -i -X GET ${fullUrl}`;
    // extra seen args from tools/explorer dev console : &debug=all&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors"`;
    logCurlCommand(curlCommand);
}

// https://developers.facebook.com/docs/graph-api/reference/page/#Creating (create not first example) but check #requirements
const postOnPage = (page_id, accessToken, message = "this is a #nodeTestFB test") => {// page token is required, this didn't work with user token
    console.log(` * POST [page-post] ${message} :`)
    const shortUrl = `/${page_id}/feed`;
    const fullUrl = `${FB_GRAPH_AP_URL}${shortUrl}?access_token=${accessToken}`
    const payload = JSON.stringify({message});// /!\ limitations: escape quote && input sanitization
    const curlCommand = `curl -i -X POST  -H 'Content-Type: application/json' -d '${payload}' ${fullUrl}`;
    logCurlCommand(curlCommand);
    // ToBeConfirmed // > then doc about result aka page-post:  https://developers.facebook.com/docs/graph-api/reference/page-post
};

// https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension
// https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived
const getLongLivedToken = (app_id, app_secret, accessToken) => {
    console.log(` * GET [long-lived-token] :`)
    const shortUrl = `/oauth/access_token`;
    const fullUrl = `${FB_GRAPH_AP_URL}${shortUrl}`
    + `?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${accessToken}`;
    const curlCommand = `curl -i -X GET "${fullUrl}"`;
    logCurlCommand(curlCommand);
};

if (!isSet(accessToken)) {
    console.log(" XXX [env] FB_ACCESS_TOKEN is required   : export FB_ACCESS_TOKEN=xxx");
    console.log(" [i] generate a short-lived access token : https://developers.facebook.com/tools/explorer");
    console.log(" [i] debug an access token               : https://developers.facebook.com/tools/debug/accesstoken/");
    exit(1);
}

notice();
getPageInfo(page_id, accessToken)
postOnPage(page_id, accessToken);
isSet(app_id) && isSet(app_secret) && getLongLivedToken(app_id, app_secret, accessToken);
