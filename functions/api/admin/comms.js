import mailchannelsPlugin from '@cloudflare/pages-plugin-mailchannels';
/*
export const onRequest = mailchannelsPlugin({
  apiKey: 'your_api_key',
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "hello@example.com" }],
    },
  ],
  from: { name: "Enquiry", email: "no-reply@example.com" },
  content: [
    {
      type: 'text/plain',
      value: 'This is an enquiry',
    },
  ],
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});
*/


//const jwt = require('@tsndr/cloudflare-worker-jwt');
export async function onRequest(context) {
  try {
    const { request } = context;

    const { name, email, subject, message } = await request.json();

    const resp = await fetch(
      new Request("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: "opensource@thearcadia.xyz",
                  name: "Name",
                },
              ],
            },
          ],
          from: {
            email: "inquiry@opensource.express",
            name,
          },
          subject,
          content: [
            {
              type: "text/plain",
              value: `From: ${email}: ${message}`,
            },
          ],
        }),
      })
    );

    const respContent = resp.status + " " + resp.statusText;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          message: "Your message has been sent!",
          respContent,
        },
      }),
      {
        headers: {
          "content-type": "application/json",
          // Allow all cors
          "Access-Control-Allow-Origin": "*",
          // Allow all cors methods
          "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
          // Allow all cors headers
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        data: {
          message: "Something went wrong!",
          error: err.message,
        },
      }),
      {
        headers: {
          "content-type": "application/json",
          // Allow all cors
          "Access-Control-Allow-Origin": "*",
          // Allow all cors methods
          "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
          // Allow all cors headers
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
  }
}


async function sendEmail(to, from, subject, message) {
  const response = await mailchannelsPlugin(to, subject, message, {
    from: { name: from.name, email: from.email },
  });
    console.log("response")

  console.log(response)
  return response;
}
/*


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/*
async function handleRequest(request) {
  console.log('1')
  if (request.method === 'POST') {
    const to = "chrisjmccreadie@protonmail.com";
    const from = { name: "Enquiry", email: "no-reply@example.com" };
    const subject = "Enquiry";
    const message = "This is an enquiry";
    const response = await sendEmail(to, from, subject, message);
   console.log(response)
    return new Response(null, {
      status: 302,
      headers: { Location: '/thank-you' },
    });
  } else {
    return new Response('Invalid request method', { status: 400 });
  }
}




/*
addEventListener('fetch', event => {
    console.log('in 0')

    event.respondWith(handleRequest(event.request))
})


//async function handleRequest(request) {
export async function onRequestPost(context) {
    //build the paramaters
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;
    console.log('in 1')
    //if (request.method === 'POST') {
    console.log('in 2')

    const body = await request.json();
    console.log(body)
    const to = body.to;
    const subject = body.subject;
    const message = body.message;
    console.log(mailchannelsPlugin)
    const response = await mailchannelsPlugin(to, subject, message);
    console.log('in 3')
console.log(response)
    return new Response('email sent', { status: 200 });

    //return new Response(JSON.stringify(response));
    // } else {
    //return new Response('Invalid request method', { status: 400 });
    //}
}



/*
async function sendEmail(request) {
  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: 'chrisjmccreadie@portonmail.com', name: 'Test Recipient' }],
        },
      ],
      from: {
        email: 'sender@example.com',
        name: 'Workers - MailChannels integration',
      },
      subject: 'Look! No servers',
      content: [
        {
          type: 'text/plain',
          value: 'And no email service accounts and all for free too!',
        },
      ],
    }),
  });
  return response;
}


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
  return sendEmail(request);
}
/*
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return sendEmail(request);
}
*/