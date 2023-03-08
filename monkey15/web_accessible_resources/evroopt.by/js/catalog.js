if (!window.___frt) window.___frt = {};

/* eslint-disable no-unused-vars */
window.___frt.Catalog = class {
    static reSort() {
        let items0 = document.querySelectorAll('.product__el.tovar');
        let items = Array.from(items0);
        if (items.length === 0) return;

        items
            .sort((item1, item2) => {
                return window.___frt.CatalogItem.getPricePerKg(item2)-window.___frt.CatalogItem.getPricePerKg(item1);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }
};

window.___frt.CatalogItem = class {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    static getWeight(item) {
        let weight_txt = item.querySelector('.product-preview__desc').innerText.split(',').pop().trim().replace(',', '.');
        let weight_value = parseFloat(weight_txt);

        if (weight_txt.endsWith('кг')) return weight_value*1000;
        if (weight_txt.endsWith('мг')) return weight_value;
        if (weight_txt.endsWith('г')) return weight_value;
        if (weight_txt.endsWith('мл')) return weight_value;
        if (weight_txt.endsWith('л')) return weight_value*1000;

        return 1;
    }

    static getPrice(item) {
        return parseFloat(item.querySelector('[data-discont]').innerText);
    }

    static getPricePerKg(item) {
        return this.getWeight(item)/this.getPrice(item);
    }
};

window.___frt.Catalog.reSort();
