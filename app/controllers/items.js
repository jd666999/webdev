
import { setFlash } from "../flash.js";
import { createItem, getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";

export function itemsController({ request }){
    const items = getItems();
    return render(itemsView, { items }, request);
}

export async function addItemController({request}){
    const formData = await request.formData();
    const newItem = formData.get("new-item");

    if(!newItem || newItem.length<5) {
        const error = newItem ? `New item (${newItem}) must be minimums of five character`:"new item is required.";
        const items = getItems();
        return render(itemsView, { items , error }, request, 400);
    }
    createItem(newItem);
    const headers = new Headers();
    setFlash(headers, ` added '${newItem}' to the list`);
    headers.set("Location", "/items");
    return new Response(null, { headers, status: 303 });
}