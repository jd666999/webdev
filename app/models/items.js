import {db} from "../db.js"

export function getItems(){
    return db.prepare("SELECT * FROM items").all();
}