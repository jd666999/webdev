
import { createItem, getItems } from "../models/items.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";

export function itemsController(ctx){
    const {errors} =ctx;
    const items = getItems();
    return render(itemsView, { items, errors }, ctx);
}

export function addItemController(ctx, next ){
    const { headers, isValid, validated} =ctx;
    if(!isValid) return next(ctx);
    const newItem = validated["new-item"];
    createItem(newItem);
    console.log("new item added");
    
    return redirect(headers, "/items",` added '${newItem}' to the list`)

}