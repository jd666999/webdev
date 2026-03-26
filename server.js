import {serveDir} from '@std/http';
import  render from "./render.js";

export default function server (request){

    const url = new URL(request.url);
    console.log(` \n${request.method}${url.pathname}${url.search}`);

    if(url.pathname.startsWith("/assets/")) {
    return serveDir(request);
    }
    
    

    if (url.pathname == "/") {
        return render(`
            <h1>My web application</h1>
            <p> hello world</p>
        `)
    
    }

    return render(`
        <h1>404 Not Found</h1>
        <p> The page you are looking for does not exist </p>
    `, 404)


    }