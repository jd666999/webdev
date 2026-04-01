import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";


export default function render(viewFn, data, ctx ,status = 200) {
    const {request, session , headers} = ctx;
    const content = viewFn(data);
    const footerMessage = session 
       ? `logged in as '${session.username}'`: "";
    const links = `
        ${ session 
            ? `<a href="/items"> items </a>
               <form method="POST" action="/logout"><button>sign out</button></form>
            
            `
            : `<a href="/login"> Sign in </a>`
        }
    `

    const flash = getFlash(request.headers, headers);
    const flashMessage = flash ? `
    <aside id ="flash">
     <p>${escape(flash)} </p>
    </aside>
    `: '';

    
    headers.set("Content-Type", "text/html");

    const html = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
         <title> MY web application </title>
         <meta charset="UTF-8">
         <link rel="icon" href="/assets/icon.svg">
         <link rel="stylesheet" href="/assets/style.css">
        </head>
        
         <body>
            <header>
                <h1> My web application </h1>
                <nav>
                    <a href="/"> Home </a>
                    ${links}
                <nav>
            </header>
        <main>
         ${flashMessage}
         ${content}
         </main>
         <footer>
            <p>${footerMessage}</p>
            <p> &copy; 2027 My web application </p>
         </footer>
        </body>
        </html>

        `
    return new Response(html, {headers, status});

}