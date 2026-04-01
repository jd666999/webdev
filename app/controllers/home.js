import { currentSession } from "../auth.js";
import render from "../render.js";
import { homeView } from "../views/home.js";

export function homeController({request}){
    const session = currentSession(request.headers);
    return render(homeView,{session}, request);
}