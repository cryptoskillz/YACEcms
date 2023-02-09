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



async function gatherResponse(response) {
    const { headers } = response;
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return await response.json();
    }
    return response.text();
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
    //get the tables
    //get the id 
    let id = searchParams.get('id');
    //hold the query
    let query;
    //hold the results for the lookups
    let theResults = [];
    //build the query
    let theSQL = `SELECT buildUrl from site where id = ${id}`;
    //console.log(theSQL)
    //run it
    query = context.env.DB.prepare(theSQL);
    let queryResult = await query.first();
    //console.log(queryResult)
    const theUrl = `${queryResult.buildUrl}`
    //console.log(theUrl)
    const init = {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    };
    try {
        //return theUrl
        //call block stream to check the transaction
        let theResponse = await fetch(theUrl, init);
        //console.log(theResponse)
        let results = await gatherResponse(theResponse);
        //console.log(results)
        ///return the response
        return new Response("ok", { status: 200 });
    } catch (error) {
        //console.log(error);
        //return new Response(JSON.stringify({ "error": error }), { status: 400 });
        return (error)
    }




}