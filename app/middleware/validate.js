import { log } from "node:console";
import { validateSchema } from "../validation.js";

export function validate(schema){
    return async (ctx, next) => {
        const {request} = ctx
        const formData = await request.formData();
        const validation = validateSchema(formData, schema);
        if(validation.isValid){
            console.log("validated ok");
        } else {
            ctx.status = 400;
            console.log("validation errors");
        }
        
        return next({...ctx, ...validation});
    };


}