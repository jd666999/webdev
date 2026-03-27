export default function render(viewFn, status = 200) {


    const content = viewFn();
    const headers = new Headers();
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
                <nav>
            </header>
        <main>
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