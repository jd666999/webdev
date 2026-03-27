import render from "../render.js";
import { homeView } from "../views/home.js";

export function homeController(){
    return render(homeView);
}