//JWT model
const jwt = require('@tsndr/cloudflare-worker-jwt');
//decode the jwt token
let decodeJwt = async (req, secret) => {
    let bearer = req.get('authorization')
    bearer = bearer.replace("Bearer ", "");
    let details = await jwt.decode(bearer, secret)
    return (details)
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
    let table = searchParams.get('table');
    //note we are not using this as we are assuming that it is not going to be used in a multi tennat env but this is easily changed if we want to add this functionality.
    let userId = searchParams.get('id');
    //console.log(theData[i]);
    //build the query
    //where email = '${registerData.email}'
    const theSQL = `SELECT COUNT(*) as total from ${table} `
    const query = context.env.DB.prepare(theSQL);
    console.log(theSQL)
    const queryResult = await query.first();
    ///return the response
    return new Response(JSON.stringify(queryResult), { status: 200 });

}