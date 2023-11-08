if (!window.___frt) window.___frt = {};

/* eslint-disable no-unused-vars */
window.___frt.Catalog = class {
    static load_more() {
        let button = document.querySelector('.more_text_ajax');
        if (button===null) return;
        button.click();

        setTimeout(() => {
            this.load_more();
        }, 4444);
    }

    static marker() {
        let items = document.querySelectorAll('div[class^="products_container"] > div[class^="products_products"] > div');

        for (const el of items) {
            let price = window.___frt.CatalogItem.getPricePerKg(el);

            switch (true) {
                case price < 3.55:
                    el.style.border = '3mm solid green';
                    break;
                case price < 5.55:
                    el.style.border = '3mm solid lightgreen';
                    break;
                case price < 10.55:
                    el.style.border = '3mm solid gray';
                    break;
                case price < 13.55:
                    el.style.border = '3mm solid orange';
                    break;
                case price < 15.55:
                    el.style.border = '3mm solid red';
                    break;
                default:
                    el.style.border = '3mm solid black';
            }
        }
    }

    static reSort() {
        let items = document.querySelectorAll('div[class^="products_container"] > div[class^="products_products"] > div');

        let items_arr = Array.from(items);
        if (items_arr.length === 0) return;

        items_arr
            .sort((item1, item2) => {
                try {
                    let p1 = window.___frt.CatalogItem.getPricePerKg(item1);
                    let p2 = window.___frt.CatalogItem.getPricePerKg(item2);
                    return p1-p2;
                } catch (e) {
                    console.warn(e);
                    return 0;
                }
            })
            .map((item) => {
                items_arr[0].parentElement.appendChild(item);
            });
    }

    static run() {
        // this.load_more();
        this.marker();
        this.reSort();
    }
};

window.___frt.CatalogItem = class {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    static getWeight(item) {
        let el = item.querySelector('span[class^="measure_measure"]');
        if (el) {
            let text = el.innerText.replace(',','.');
            let weight_value = parseFloat(text);

            let weight_unit = text.split(' ')[1];

            if (this.nonKiloUnits.includes(weight_unit)) return weight_value / 1000;
            return weight_value;
        }

        let titleElement = item.querySelector('a[class^="vertical_title"]');
        if (!titleElement) return 1;

        let matches = titleElement.innerText.match(/(\d+[.,]?\d*)\s?(г|мг|кг|мл|л)/ui);
        if (matches === null) return 1;
        let weight_value = parseFloat(matches[1].replace(',','.').replace(/^\./, ''));
        let weight_unit = matches[2].toLowerCase();

        if (this.nonKiloUnits.includes(weight_unit)) return weight_value / 1000;
        return weight_value;
    }

    static getPricePerKg(item) {
        let el = item.querySelector('span[class^="price_main"]');
        if (!el) return 1;
        let text = el.innerText.replace(',','.');
        let price = parseFloat(text);
        if (text.includes('/кг')) return price;
        return price / this.getWeight(item);
    }
};
