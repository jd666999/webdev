import { homeController } from "./controllers/home.js";
import { notFoundContoller } from "./controllers/notFound.js";
import { staticController } from "./controllers/static.js";

export default function server (request){

    const url = new URL(request.url);
    console.log(` \n${request.method}${url.pathname}${url.search}`);

    if(url.pathname.startsWith("/assets/")) {
    return staticController({request});
    }
    
    

    if (url.pathname == "/") {
        return homeController({request});
    
    }

    return notFoundContoller({request});


    }