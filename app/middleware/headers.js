export function withHeaders(ctx, next){
    console.log("Creating Headers");
    ctx.headers =  new Headers();
    return next(ctx);
}