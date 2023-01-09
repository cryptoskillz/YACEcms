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
    //get the search paramaters
    const { searchParams } = new URL(request.url);
    //get the id
    let id = searchParams.get('id');
    //check if there is a property id.
    if (id == null)
        return new Response(JSON.stringify({ error: "no property id" }), { status: 400 });
    const property = context.env.DB.prepare(`SELECT * from property where id = ${id}`);
    const propertyResult = await property.first();
    return new Response(JSON.stringify(propertyResult), { status: 200 });

}