import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";


export default function render(viewFn, data, request ,status = 200) {
    const content = viewFn(data);
    const headers = new Headers();

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

        </head>
         <title> MY web application </title>
         <meta charset="UTF-8">
         <link rel="icon" href="/assets/icon.svg">
         <link rel="stylesheet" href="/assets/style.css">
        </head>
        
         </body>
            <header>
                <h1> My web application </h1>
                <nav>
                    <a href="/"> Home </a>
                    <a href="/items"> items </a>
                <nav>
            </header>
        <main>
         ${flashMessage}
         ${content}
         </main>
         <footer>
            <p> &copy; 2027 My web application </p>
         </footer>
        </body>
        </html>

        `
    return new Response(html, {headers, status});

}