import { login } from "../auth.js";
import { createUser } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController(ctx){
    const {errors} = ctx;
    return render(registrationFormView,{errors},ctx);

}

export async function addUserController(ctx, next ){
    const {isValid,validated, headers} = ctx
    if(!isValid) return next(ctx);
    await createUser(validated)
    console.log("created used");
    login(headers,validated.username);
    return redirect(headers, "/",`user '${validated.username} created'`)
    

}

