import { currentSession } from "../auth.js";

export function withSession(ctx, next ){

    const {request} = ctx;
    ctx.session = currentSession(request.headers);
    console.log(ctx.session ? `logged  in as ${ctx.session.username}`: "No session found");

    
    return next(ctx);


}