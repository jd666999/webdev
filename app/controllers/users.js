import { login } from "../auth.js";
import { createUser } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { userSchema } from "../schema/user.js";
import { validateSchema } from "../validation.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController(ctx){
    return render(registrationFormView,{},ctx);

}

export async function addUserController(ctx){
    const {request, headers} = ctx;
    const formData = await request.formData();
    const {isValid, errors,validated} = validateSchema (formData, userSchema);
    if(!isValid) {
        return render(registrationFormView, {errors}, ctx ,400);
    }
    await createUser(validated)
   
    login(headers,validated.username);
    return redirect(headers, "/",`user '${validated.username} created'`)
    

}

