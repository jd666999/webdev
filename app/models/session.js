import { db } from "../db.js";

export function createSession(username){
    const sessionId =crypto.randomUUID();
    db.prepare(`INSERT INTO sessions (id,username) 
        VALUES(:sessionId,:username)
        `).run({sessionId, username});

        return sessionId;

}