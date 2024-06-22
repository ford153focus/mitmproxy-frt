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
            let items = Array.from(products);

            for (const item of items) {
                let price = get_kilo_price(item);
                let html = `<p style="font-size: x-small;">(${price} byn/kg)</p>`;
                item.querySelector('p[class^=ProductCard_priceCurrent]').insertAdjacentHTML('afterEnd', html);
            }

            items.sort((product1,product2) => {
                return get_kilo_price(product1) - get_kilo_price(product2);
            }).forEach(el => {
                if (!section.querySelector('[class^=ProductCardList_root]')) return;
                section.querySelector('[class^=ProductCardList_root]').insertAdjacentElement('beforeEnd', el);
            });
        }
    }, 1530);
}

function draw_button() {
    let sortButton = document.createElement('button');
    sortButton.id = '___frt_sorter';
    sortButton.innerText = 'Sort';

    sortButton.onclick = (() => {
        sort();
    });

    sortButton.style['background-color'] = 'darkgray';
    sortButton.style['border-radius'] = '3mm';
    sortButton.style['border'] = '1mm solid black';
    sortButton.style['bottom'] = '3mm';
    sortButton.style['display'] = 'block';
    sortButton.style['left'] = '3mm';
    sortButton.style['padding'] = '1mm 3mm';
    sortButton.style['position'] = 'fixed';
    sortButton.style['z-index'] = '10';

    sortButton.type = 'button';

    document.body.insertAdjacentElement('beforeend', sortButton);
}

setTimeout(() => {
    draw_button();

    for (const cat_button of document.querySelectorAll('[class^=CategoriesPanel_listItem]')) {
        cat_button.addEventListener('click', () => {
            sort();
        });
    }

    sort();
}, 333);
