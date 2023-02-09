//set data main to whatever is in env for consistency
//  wrangler d1 execute DB --local --command="SELECT id,name from site where apiKey = 'e1394ec4-6962-427d-a65d-547e4380eced'"  
// wrangler d1 execute DB --local --command="SELECT id,name from site where apiKey = 'f76ee4f4-da2a-48c6-aa7a-4c6b12b5392f'"
//wrangler d1 execute DB --local --command="SELECT * from site "

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
    //set the data array
    let theDataArray = { site: [], data: [] }
    //set the env data
    const KV = context.env.kvdata;
    //get the search paramaters
    const { searchParams } = new URL(request.url);
    //get the tables
    //get the id 
    let id = searchParams.get('id');
    //console.log(id)
    //hold the query
    let query;
    //hold the results for the lookups
    let theResults = [];
    //build the query
    let theSQL = `SELECT id,name,apiKey from site where apiKey = '${id}'`;
    //console.log(theSQL)
    //run it
    query = context.env.DB.prepare(theSQL);
    let queryResult = await query.first();
    theDataArray.site.push(queryResult)
    //console.log(queryResult)
    //build the query
    theSQL = `SELECT name,jsonContent as data from page where siteId = ${queryResult.id}`;
    //console.log(theSQL)
    //run it
    query = context.env.DB.prepare(theSQL);
    let queryResults = await query.all();
    //console.log(queryResults)
    //loop through the results
    for (var i = 0; i < queryResults.results.length; ++i) {
        //get the result
        const theData = queryResults.results[i];
        //console.log(theData);
        //get the env data from the pointer in d1
        const kvName = `${theData.data}`;
        //get the data from kv
        let jsonContent = await KV.get(kvName);
        //parse it
        jsonContent = JSON.parse(jsonContent);
        //put the back in the object
        queryResults.results[i].data = jsonContent;
        //add it to the results array
        theDataArray.data.push(queryResults.results);
    }
    ///return the response
    return new Response(JSON.stringify(theDataArray), { status: 200 });
}