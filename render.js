export default function render(content, status = 200) {

    const headers = new Headers();
    // const status = 404;
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
                    <a href="/about"> About </a>
                    <a href="/contact"> Contact </a>
                <nav>
            </header>
         ${content}
        </body>
        </html>

        `
    return new Response(html, {headers, status});

}