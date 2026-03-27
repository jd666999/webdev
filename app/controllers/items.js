import { getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";

export function itemsController(){
    const items = getItems();
    console.log(items);
    return render(itemsView, { items });
}