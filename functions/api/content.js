/*
    notes:


    naming convertion for KV stores.
    <methoddame><payloadname>]<payloadid>
*/

//hold the payload
let payLoad;
//hold the contenttypes
let contentType;
//set data main to whatever is in env for consistency
const datamain = "data2";
let dataSchema = { id: "", name: "", createdAt: "", content: "" }

//JWT model
const jwt = require('@tsndr/cloudflare-worker-jwt');
//unique uid module
var uuid = require('uuid');
//set up the data schema for the table.
//note we could extend this to have field types and other such nonsense for dynamic  rendering but I don't want to do that and you cannot make me.

//return the date
let getDate = () => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let formattedDate = `${date_ob.getDate()}/${date_ob.getMonth()+1}/${date_ob.getFullYear()}`
    return (formattedDate)
}

//decode the jwt token
let decodeJwt = async (req, secret) => {
    let bearer = req.get('authorization')
    bearer = bearer.replace("Bearer ", "");
    let details = await jwt.decode(bearer, secret)
    return (details)
}


export async function onRequestPut(context) {
    //const jwt = require('@tsndr/cloudflare-worker-jwt')
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    contentType = request.headers.get('content-type');
    if (contentType != null) {
        //get the payload
        payLoad = await request.json();
        //get the payload content        
        const theJson = JSON.stringify(payLoad.content);
        //set the KV dats
        const KV = context.env.kvdata;
        //get the item
        const kvName = `${payLoad.siteId}-${payLoad.id}`;
        //fetch it from the kv datastore
        await KV.put(kvName, JSON.stringify(theJson));
        //build the query
        let theQuery = `UPDATE page SET jsonContent = '${kvName}' where id = ${payLoad.id}`;
        //console.log(theQuery)
        const info = await context.env.DB.prepare(theQuery).run();
        return new Response(JSON.stringify({ message: `Page content has been updated` }), { status: 200 })
    }

}



//get the records
export async function onRequestGet(context) {
    //build the paramaters
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;
    //get the token
    let theToken = await decodeJwt(request.headers, env.SECRET);
    //get the search paramaters
    const { searchParams } = new URL(request.url);
    //get the id 
    const pageId = searchParams.get('id');
    //get the site id
    let siteId = searchParams.get('siteId');
    //hold the query
    let query;
    //hold the results for the lookups
    let theResults = [];
    //build the query
    //let theSQL = `SELECT id,name,jsonContent from page where id = ${pageId}`;
    //console.log(theSQL)
    //run it
    //query = context.env.DB.prepare(theSQL);
    //let queryResult = await query.first();
    //set the env data
    const KV = context.env.kvdata;
    //get the env data
    const kvName = `${siteId}-${pageId}`;
    //get the data
    let jsonContent = await KV.get(kvName);
    //parse it
    jsonContent = JSON.parse(jsonContent)
    ///return the response
    return new Response(JSON.stringify(jsonContent), { status: 200 });

}