import redirect from "../redirect.js";
import render from "../render.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController({request}){
    return render(registrationFormView,{},request);

}

export async function addUserController({request}){
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // validate the incoming data 

    const validUser = true;

    const headers = new Headers();


    if(validUser){

    // create user record
    console.log("new user:", username);
    console.log("new password:", password);

    return redirect(headers, "/",`user '${username} created'`)

    }
    

}

