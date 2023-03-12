let t1 = document.querySelectorAll('li[class^="BasketOffers_item__"]');

let t2 = Array.from(t1);
t2.shift();

let t3 = [];

for (let el of t2) {
    t3.push(`${el.querySelector('strong[class^="ProductCard_name__"]').innerText} (${el.querySelector('span[class^="ProductCard_weight__"]')?.innerText}) (${el.querySelector('strong[class^="Price_price__"]').innerText})`);
}

for (let el of t3.sort()) {
    console.info(el);
}
