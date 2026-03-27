import { createItem, getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";

export function itemsController(){
    const items = getItems();
    return render(itemsView, { items });
}

export async function addItemController({request}){
    const formData = await request.formData();
    const newItem = formData.get("new-item");
    createItem(newItem);
    const headers = new Headers();
    headers.set("Location", "/items");
    return new Response(null, { headers, status: 303 });
}