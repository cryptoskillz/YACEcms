
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
    //call the cloudflare API for a one time URL
    const response = await fetch(context.env.CLOUDFLAREURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${context.env.BEARERTOKEN}`
        }
    });
    //get the repsonse
    const cfresponse = await response.json();
    //return the URL
    return new Response(cfresponse.result.uploadURL);
}