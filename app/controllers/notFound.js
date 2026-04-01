import render from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundContoller(ctx){
    ctx.status =404;
    return render(notFoundView,{},ctx);
}