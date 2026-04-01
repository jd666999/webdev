import { setCookie } from "@std/http/cookie";
import { createSession } from "./models/session.js";

export function login(headers,username){
    //create session record

    const sessionId = createSession(username);
    //add cookie
    setCookie(headers,{
        name: "sessionId",
        value: sessionId,
        path: "/"
    })
}