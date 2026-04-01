import { db } from "../db.js";

const salt ="someKindovseekritvalooo"


const options = {
    
    name: "PBKDF2",
    hash: "SHA-256",
    iterations: 5000,
    salt: new Uint8Array(Array.from(new TextEncoder().encode(salt)))

}

export async function createUser({username, password}){

    const hashedPassword = await hashPassword(password)

    db.prepare(`INSERT INTO users (username, hashedPassword) 
        VALUES (:username, :hashedPassword)
        `).run({username, hashedPassword})
}
function getUser(username){
    return db.prepare("SELECT * FROM users WHERE username=:username").get({username});

}

export async function checkCredentials({username,password}){

    const user = getUser(username);
    if(!user) return false;
    const  hashed = await hashPassword(password);
    return user.hashedPassword == hashed;


}


async function hashPassword(password){
    const inputBytes = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey("raw", inputBytes, "PBKDF2", false, ['deriveBits']);
    const buffer = await crypto.subtle.deriveBits(options,key,256);
     return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2,0)).join("");


}