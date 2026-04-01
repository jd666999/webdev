
import { createItem, getItems } from "../models/items.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { newItemSchema } from "../schema/newItem.js";
import { validateSchema } from "../validation.js";
import { itemsView } from "../views/items.js";

export function itemsController(ctx){
    const { session, headers } = ctx;
    if(!session) {
        return redirect(headers, "/login", "sign in to gain access");
    }
    const items = getItems();
    return render(itemsView, { items }, ctx);
}

export async function addItemController(ctx){
    const {request, headers} =ctx;
    const formData = await request.formData();

    const { isValid, errors} = validateSchema(formData, newItemSchema);

    const newItem = formData.get("new-item");
  
    if(!isValid) {
        const items = getItems();
        return render(itemsView, { items , errors }, ctx, 400);
    }
    createItem(newItem);
    return redirect(headers, "/items",` added '${newItem}' to the list`)

}