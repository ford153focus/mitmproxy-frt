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

    static filter() {
        for (const el of document.querySelectorAll('.catalog_block .item_block')) {

            let price = window.___frt.CatalogItem.getPricePerKg(el);
            let card;

            switch (true) {
                case price < 3.55:
                    el.style.border = '3mm dotted';
                    break;
                case price < 5.55:
                    el.style.border = '3mm solid lightgreen';
                    break;
                case price < 10.55:
                    el.style.border = '3mm solid green';
                    break;
                case price < 13.55:
                    el.style.border = '3mm solid yellow';
                    break;
                case price < 15.55:
                    el.style.border = '3mm solid red';
                    break;
                default:
                    el.style.border = '3mm solid black';
            }

            let span = document.createElement('span');
            span.innerHTML = price;
            span.className = 'price-per-kg';
            span.style.position = 'absolute';
            span.style.bottom = '3px';
            span.style.right = '3px';
            span.style.width = 'inherit';

            el.querySelector('span.price-per-kg')?.remove();
            el.style.position = 'relative';
            el.insertAdjacentElement('beforeend', span);
        }
    }

    static reSort() {
        let items = document.querySelectorAll('.catalog_block .item_block');
        items = Array.from(items);
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

    static run() {
        this.load_more();
        this.filter();
        this.reSort();
    }
};

window.___frt.CatalogItem = class {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    static getWeight(item) {
        let matches;

        let titleElement = item.querySelector('.item-title');
        if (!titleElement) return 1;

        // 8*62.5г || 20х1,8 г
        matches = titleElement.innerText.match(/(\d+[*xх][\d.,]+)\s*(г)$/ui);
        if (matches) {
            let match = matches[1].replace(',','.');
            match = match.replace('x','*').replace('х','*');
            return eval(match)/1000;
        }

        matches = titleElement.innerText.match(/(\d+[.,]?\d*)\s?(г|мг|кг|мл|л)/ui);
        if (matches === null) return 1;
        let weight_value = parseFloat(matches[1].replace(',','.').replace(/^\./, ''));
        let weight_unit = matches[2].toLowerCase();

        if (this.nonKiloUnits.includes(weight_unit)) return weight_value / 1000;
        return weight_value;
    }

    static getPricePerKg(item) {
        let price = parseFloat(item.querySelector('.price_value').innerText);
        return price / this.getWeight(item);
    }
};
