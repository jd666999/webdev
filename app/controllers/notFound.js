import render from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundContoller(){
    return render(notFoundView,{},404);
}