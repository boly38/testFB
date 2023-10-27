// overall docs: https://developers.facebook.com/docs#apis-and-sdks
const version = "v18.0";// get latest version from https://developers.facebook.com/docs/graph-api or /tools/explorer

//~ application inputs:
const page_id = process.env.FB_PAGE_ID;// from page uri : https://facebook.com/<page_id_here> // aka. Page-scoped ID or PSID in doc?
//~ application access token:
const accessToken = process.env.FB_ACCESS_TOKEN;
// on-line generate access token and test API : https://developers.facebook.com/tools/explorer
// debug access token : https://developers.facebook.com/tools/debug/accesstoken/ // IMPORTANT to check access token expiration/type/scope
// ==> Page access token > expiration: 1 hour
// ==> User access token > expiration: 1 hour
// ==> TODO: how to generate/recycle token via API?

// useless for now // const client_id = process.env.FB_APP_ID;// get your application id from https://developers.facebook.com/apps/?show_reminder=true

const notice = () => {
    console.log("\n [i] curl command : warn about carriage return when copy past command\n");
}

// https://developers.facebook.com/docs/graph-api/reference/page/#Reading
const getPageInfo = (page_id, accessToken) => {// user OR page token is required
    const urlPage = `/${page_id}`;
    const curlCommand = `curl -i -X GET https://graph.facebook.com/${version}${urlPage}?access_token=${accessToken}`;
    // extra seen args from tools/explorer dev console : &debug=all&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors"`;
    console.log(` * ${version} GET ${urlPage}`)
    console.log(` * curl command:\n\n${curlCommand}\n`)
}

// https://developers.facebook.com/docs/graph-api/reference/page/#Creating (create not first example) but check #requirements
const postOnPage = (page_id, accessToken, message = "this is a #nodeTestFB test") => {// page token is required, this didn't work with user token
    const urlPostPage = `/${page_id}/feed`;
    const fullUrl = `https://graph.facebook.com/${version}${urlPostPage}?access_token=${accessToken}`
    const payload = JSON.stringify({message});// /!\ limitations: escape quote && input sanitization
    const curlCommand = `curl -i -X POST  -H 'Content-Type: application/json' -d '${payload}' ${fullUrl}`;
    console.log(` * ${version} POST ${urlPostPage}`)
    console.log(` * curl command:\n\n${curlCommand}\n`)
    // ToBeConfirmed // > then doc about result aka page-post:  https://developers.facebook.com/docs/graph-api/reference/page-post
};
notice();
getPageInfo(page_id, accessToken)
postOnPage(page_id, accessToken);

