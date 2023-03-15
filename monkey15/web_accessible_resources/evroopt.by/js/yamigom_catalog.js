if (!window.___frt) window.___frt = {};

/* eslint-disable no-unused-vars */
window.___frt.Catalog = class {
    static filter() {
        for (const el of document.querySelectorAll('li[class^="Subcategory_item__"]')) {
            if (el.querySelector('span[class^=ProductCard_sold___]') !== null) {
                el.remove();
            }

            let price = window.___frt.CatalogItem.getPricePerKg(el);

            switch (true) {
                case price < 3.55:
                    el.querySelector('a').style.borderColor = 'white'
                    break;
                case price < 5.55:
                    el.querySelector('a').style.borderColor = 'lightgreen'
                    break;
                case price < 10.55:
                    el.querySelector('a').style.borderColor = 'green'
                    break;
                case price < 13.55:
                    el.querySelector('a').style.borderColor = 'yellow'
                    break;
                case price < 15.55:
                    el.querySelector('a').style.borderColor = 'red'
                    break;
                default:
                    el.querySelector('a').style.borderColor = 'black'
            }
        }
    }

    static reSort() {
        for (const category of document.querySelectorAll('li[class^="Subcategory_subcategory__"]')) {
            let items0 = category.querySelectorAll('li[class^="Subcategory_item__"]');
            let items = Array.from(items0);
            if (items.length === 0) return;

            items
                .sort((item1, item2) => {
                    try {
                        return window.___frt.CatalogItem.getPricePerKg(item1) - window.___frt.CatalogItem.getPricePerKg(item2);
                    } catch (e) {
                        console.warn(e);
                        return 0;
                    }
                })
                .map((item) => {
                    items[0].parentElement.appendChild(item);
                });
        }
    }
}

window.___frt.CatalogItem = class {
    static nonKiloUnits = [' г', ' мг', ' мл'];

    static getPricePerKg(item) {
        let price_txt = item.querySelector('strong[class^="Price"]')?.innerText.replace(',', '.');
        if (typeof price_txt === 'undefined') return 0;
        let price = parseFloat(price_txt);
        if (price_txt.endsWith('кг')) return price;

        let weight_txt = item.querySelector('span[class^="ProductCard_weight__"]')?.innerText;
        if (typeof weight_txt === 'undefined')
            weight_txt = item.querySelector('strong[class^="ProductCard_name__"]').innerText.split(',').pop();
        let weight = parseFloat(weight_txt);
        for (const nonKiloUnit of this.nonKiloUnits)
            if (weight_txt.endsWith(nonKiloUnit))
                weight = weight / 1000;

        return price / weight;
    }
}

window.___frt.Catalog.filter();
window.___frt.Catalog.reSort();
