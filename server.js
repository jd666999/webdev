export function server (request){
    console.log(request.url);
    const headers = new Headers();
    // const status = 404;
    headers.set("Content-Type", "text/html");

    const html = `
        <!DOCTYPE html>
        <html lang="en">

        </head>
         <title> MY web application </title>
         <meta charset="UTF-8">
         <link rel="icon" href="some.icon.svg">
        </head>
        
         </body>
            <h1> Hello world </h1>
            <p>hello world</p>
        </body>
        </html>

        `
    return new Response(html, {headers});
    }