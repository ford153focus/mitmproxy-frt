for (let row of document.querySelectorAll('[data-entity="basket-item"]')) {
    let name = row.querySelector('[data-entity="basket-item-name"]').innerText;
    let price = row.querySelector('[id^="basket-item-price-"]').innerText;
    console.log(`${name} - ${price}`);
}
