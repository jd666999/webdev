import render from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundContoller(ctx){
    return render(notFoundView,{},ctx,404);
}