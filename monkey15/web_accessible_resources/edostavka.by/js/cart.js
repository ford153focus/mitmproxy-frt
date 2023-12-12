let items = document.querySelectorAll('div[class^="cart_products_available"] div[class^="product_container"]');

let items2 = [];

for (let item of items) {
    let title = item.querySelector('a[class^="product_name"]').innerText;
    let price = parseFloat(item.querySelector('span[class^="price_main"]').innerText.replace(',','.'));
    items2.push(`${title} --- ${price}`)
}

let ta = document.createElement('textarea');
ta.style['margin'] = '0 auto';
ta.style['width'] ='99%';
ta.style['height'] = '15vh';
ta.style['text-align'] = 'center';
document.body.insertAdjacentElement('beforeend', ta);

for (let item of items2.sort()) {
    console.log(item);
    ta.value  += `${item}\n`;
}
