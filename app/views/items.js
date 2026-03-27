export function itemsView({items}){

    const listItems = items.map(item => `<li>${item.label}</li>`).join("\n");
    return `
        <h2> A list of items </h2>
        <ul>
           ${listItems}
        </ul>
        `
}