/*
    This endpoint deals with users
    note: we could move login into here and  possible register

*/

let createUser = (registerData) => {

}
//set the UUID 
var uuid = require('uuid');
export async function onRequestPost(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    //set a valid boolean
    let valid = 1;
    const contentType = request.headers.get('content-type')
    let registerData;
    if (contentType != null) {
        registerData = await request.json();
        //check if we want to create a user
        if (registerData.action == 1) {
            const query = context.env.DB.prepare(`SELECT COUNT(*) as total from user where email = '${registerData.email}'`);
            const queryResult = await query.first();
            if (queryResult.total == 0) {
                let apiSecret = uuid.v4();
                const info = await context.env.DB.prepare('INSERT INTO user (username, email,password,apiSecret,confirmed,blocked,isAdmin) VALUES (?1, ?2,?3,?4,?5,?6,?7)')
                    .bind(registerData.username, registerData.email, registerData.password, apiSecret, 0, 0, 0)
                    .run()

                if (info.success == true)
                    return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
                else
                    return new Response(JSON.stringify({ error: "error registering" }), { status: 400 });
            } else {
                return new Response(JSON.stringify({ error: "email already exists" }), { status: 400 });
            }
        }

        //check if we want to login a user
        if (registerData.action == 2) {
            if ((credentials.identifier == undefined) || (credentials.password == undefined))
                return new Response(JSON.stringify({ error: "invalid login" }), { status: 400 });


            //prepare the query
            const query = context.env.DB.prepare(`SELECT user.name,user.username,user.email,user.phone,user.id,user.isAdmin,userAccess.foreignId,user.apiSecret from user LEFT JOIN userAccess ON user.id = userAccess.userId where user.email = '${credentials.identifier}' and user.password = '${credentials.password}'`);
            //get the result
            //note : we could make this return first and not all 
            const queryResult = await query.all();
            //check the length
            if (queryResult.results.length > 0) {
                //set the user
                let user = queryResult.results[0];
                //console.log(user)
                if (user.isAdmin == 1) {
                    //prepare the query
                    const query2 = context.env.DB.prepare(`SELECT COUNT(*) as total from property`);
                    const queryResult2 = await query2.first();
                    user.foreignCount = queryResult2.total;
                } else {

                    //prepare the query
                    const query2 = context.env.DB.prepare(`SELECT COUNT(*) as total from property_owner where userId = ${user.id} `);
                    const queryResult2 = await query2.first();
                    user.foreignCount = queryResult2.total;
                }
                //sign the token
                const token = await jwt.sign({ password: credentials.password, username: credentials.identifier, isAdmin: user.isAdmin }, env.SECRET)
                // Verifing token
                const isValid = await jwt.verify(token, env.SECRET)
                //check it is true
                if (isValid == true) {
                    //note: we are sending down the isAdmin status the reason for this is it makese certain front end tasks easier but for any 
                    //      read / writes to the database we will always check the entry we have for them before we allow it to happebn.
                    return new Response(JSON.stringify({ "jwt": token, "user": { "id": user.id, "name": user.name, "username": user.username, "email": user.email, "phone": user.phone, "isAdmin": user.isAdmin, "foreignCount": user.foreignCount, "secret": user.apiSecret } }), { status: 200 });
                } else {
                    return new Response(JSON.stringify({ error: "invalid login" }), { status: 400 });

                }
            } else {
                return new Response(JSON.stringify({ error: "username  / password issue" }), { status: 400 });
            }
        }

    } else {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 400 });
    }


}