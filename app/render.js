import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, ctx) {
    const { request, session, headers, status = 200 } = ctx;
    const content = viewFn(data);

    const footerMessage = session ? `logged in as '${escape(session.username)}'` : "";

    const links = session
        ? `
            <a href="/programmes">Programmes</a>
            ${session.role === "student" ? `<a href="/my-interests">My Interests</a>` : ""}
            ${session.role === "admin" ? `<a href="/admin">Admin</a>` : ""}
            <form method="POST" action="/logout"><button>Sign Out</button></form>
        `
        : `
            <a href="/programmes">Programmes</a>
            <a href="/login">Sign In</a>
            <a href="/register">Register</a>
        `;

    const flash = getFlash(request.headers, headers);
    const flashMessage = flash
        ? `<aside id="flash"><p>${escape(flash)}</p></aside>`
        : "";

    headers.set("Content-Type", "text/html");

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>University Course Hub</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="icon" href="/assets/icon.svg">
            <link rel="stylesheet" href="/assets/style.css">
        </head>
        <body>
            <header>
                <h1><a href="/">University Course Hub</a></h1>
                <nav aria-label="Main navigation">
                    ${links}
                </nav>
            </header>
            <main>
                ${flashMessage}
                ${content}
            </main>
            <footer>
                <p>${footerMessage}</p>
                <p>&copy; 2026 University Course Hub</p>
            </footer>
            <script type="module" src="/assets/js/dom.js"></script>
        </body>
        </html>
    `;

    return new Response(html, { headers, status });
}
