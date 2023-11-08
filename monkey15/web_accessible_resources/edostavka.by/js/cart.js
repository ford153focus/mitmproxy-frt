let items = document.querySelectorAll('div[class^="cart_products_available"] div[class^="product_container"]');

for (let item of items) {
    let title = item.querySelector('a[class^="product_name"]').innerText;
    let price = parseFloat(item.querySelector('span[class^="price_main"]').innerText.replace(',','.'));
    console.log(`${title} --- ${price}`);
}
