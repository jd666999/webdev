import { db } from "../db.js";

export function createSession(username){
    const sessionId =crypto.randomUUID();
    db.prepare(`INSERT INTO sessions (id,username) 
        VALUES(:sessionId,:username)
        `).run({sessionId, username});

        return sessionId;

}

export function getSession(sessionId){
    return db.prepare(`
    SELECT * FROM sessions WHERE id=:sessionId
    `).get({sessionId});
}

export function deleteSession(sessionId){
    db.prepare("DELETE FROM sessions WHERE id=:sessionId").run({sessionId});

}