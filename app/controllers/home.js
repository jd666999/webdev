import render from "../render.js";
import { homeView } from "../views/home.js";

export function homeController({request}){
    return render(homeView,{}, request);
}