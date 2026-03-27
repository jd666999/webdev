export function itemsView({items}){

    const listItems = items.map(item => `<li>${item.label}</li>`).join("\n");
    return `
        <section aria-label="items section">
            <h2> A list of items </h2>
            <form method="POST"> 
                <label for="new-item"> New item:</label> 
                <input id="new-item" name= "new-item" required>
            </form>

            <ul>
            
            ${listItems}
            </ul>
        </section>
        `
}