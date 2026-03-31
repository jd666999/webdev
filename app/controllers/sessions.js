import redirect from "../redirect.js";
import render from "../render.js";
import { loginFormView } from "../views/auth.js";

export function loginFormController({request}){
    return render(loginFormView,{},request);

}

export async function addSessionController({request}){

        const formData = await request.formData();
        const username = formData.get("username");
        const _password = formData.get("password");
    
        // validate the incoming data 
    
        const validCredentials = true;
    
        const headers = new Headers();
    
    
        if(validCredentials){
        // create session record
        console.log("session created for :", username);
        return redirect(headers, "/",`logged in as '${username} created'`)
    
        }


}