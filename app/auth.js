import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { createSession, deleteSession, getSession } from "./models/session.js";

export function login(headers,username){
    //create session record

    const sessionId = createSession(username);
    //add cookie
    setCookie(headers,{
        name: "sessionId",
        value: sessionId,
        path: "/"
    })

    console.log("created session");
}


export function currentSession(requestHeaders){
    const {sessionId} = getCookies(requestHeaders);
    return sessionId && getSession(sessionId);

}


export function logout(headers,sessionId){

    deleteSession(sessionId);
    deleteCookie(headers,"sessionId", {path: "/"})

}