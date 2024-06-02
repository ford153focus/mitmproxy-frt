function get_kilo_price(product) {
    let price = parseFloat(product.querySelector('p[class^=ProductCard_priceCurrent]').innerText);
    let weight = parseFloat(product.querySelector('span[class^=ProductCard_weight]').innerText);

    let weight_txt = product.querySelector('span[class^=ProductCard_weight]').innerText;
    if (weight_txt.search(/\dг$/) > -1) weight /= 1000;
    if (weight_txt.search(/\dмл$/) > -1) weight /= 1000;

    let ratio = price/weight;
    return ratio.toFixed(2);
}

function sort() {
    setTimeout(() => {
        let sections = document.querySelectorAll('div[class^=Catalog_main] > div:not(.Catalog_header)');

        for (let section of sections) {
            let products = section.querySelectorAll('div[class^=ProductCardList_root] > div[class^=ProductCard_root]');

            Array.from(products).forEach(product => {
                let price = get_kilo_price(product);
                let html = `<p style="font-size: x-small;">(${price} byn/kg)</p>`;
                product.querySelector('p[class^=ProductCard_priceCurrent]').insertAdjacentHTML('afterEnd', html);
            });

            Array.from(products).sort((product1,product2) => {
                return get_kilo_price(product1) - get_kilo_price(product2);

            }).forEach(el => {
                if (section.querySelector('[class^=ProductCardList_root]')) {
                    section.querySelector('[class^=ProductCardList_root]').insertAdjacentElement('beforeEnd', el);
                }
                
            });
        }
    }, 1530);
}

setTimeout(() => {
    for (const cat_button of document.querySelectorAll('[class^=CategoriesPanel_listItem]')) {
        cat_button.addEventListener('click', (event) => {
            sort();
        });
    }

    sort();
}, 333);
