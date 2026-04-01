import { escape } from "@std/html";
import { fragments } from "./errors.js";

export function itemsView({items, errors = {"new-item": {} }}){

    const newItem = fragments(errors) ["new-item"];

    const listItems = items.map(item => `<li>${escape(item.label)}</li>`).join("\n");
    // const errorMessage = error.error ? `<p class="error">${escape(error.message)}</p>` :  "" ;

    return `
        <section aria-label="items section">
            <h2> A list of items </h2>
            <form method="POST" class="new-item"> 
                <label for="new-item"> New item:</label> 
                <input id="new-item" name= "new-item" required ${newItem.value}>
                ${newItem.message}
            </form>

            <ul>
            
            ${listItems}
            </ul>
        </section>
        `
}

