import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundContoller } from "./controllers/notFound.js";
import { addSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { addUserController, registrationFormController } from "./controllers/users.js";

export default function server (request){

    const url = new URL(request.url);
    console.log(` \n${request.method}${url.pathname}${url.search}`);

    if(url.pathname.startsWith("/assets/")) {
    return staticController({request});
    }
    

    if (url.pathname == "/") {
        return homeController({request});
    
    }

    if(url.pathname == "/items" && request.method == "GET"){
        return itemsController({request});
    }

    if(url.pathname == "/items" && request.method == "POST"){
        return addItemController({request});
    }

    if(url.pathname == "/login" && request.method == "GET"){
        return loginFormController({request});
    }

    if(url.pathname == "/register" && request.method == "GET"){
        return registrationFormController({request});
    }
    if(url.pathname == "/login" && request.method == "POST"){
        return addSessionController({request});
    }

    if(url.pathname == "/register" && request.method == "POST"){
        return addUserController({request});
    }


    return notFoundContoller({request});


    }