//set data main to whatever is in env for consistency
//  wrangler d1 execute DB --local --command="SELECT id,name from site where apiKey = 'e1394ec4-6962-427d-a65d-547e4380eced'"  
// wrangler d1 execute DB --local --command="SELECT id,name from site where apiKey = 'f76ee4f4-da2a-48c6-aa7a-4c6b12b5392f'"
//wrangler d1 execute DB --local --command="SELECT * from page "

const datamain = "data2";

export async function onRequestGet(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;
    //get the token
    //let theToken = await decodeJwt(request.headers, env.SECRET);
    //get the search paramaters
    const { searchParams } = new URL(request.url);
    //get the tables
    //get the id 
    let id = searchParams.get('id');
    console.log(id)
    //hold the query
    let query;
    //hold the results for the lookups
    let theResults = [];
    //build the query
    let theSQL = `SELECT id,name,apiKey from site where apiKey = '${id}'`;
    console.log(theSQL)
    //run it
    query = context.env.DB.prepare(theSQL);
    let queryResult = await query.first();
    console.log(queryResult)
    //build the query
    theSQL = `SELECT name,jsonContent from page where siteId = ${queryResult.id}`;
    console.log(theSQL)
    //run it
    query = context.env.DB.prepare(theSQL);
    let queryResults = await query.all();
    console.log(queryResults)

    let theDataArray = { site: [], data: [] }
    theDataArray.site.push(queryResult)

    theDataArray.data.push(queryResults.results)
    ///return the response
    return new Response(JSON.stringify(theDataArray), { status: 200 });
}