import render from "../render.js";
import { homeView } from "../views/home.js";

export function homeController(ctx){
    const {session}  = ctx;
    return render(homeView,{session}, ctx);
}