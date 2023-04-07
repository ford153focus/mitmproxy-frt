if (!window.___frt) window.___frt = {};

window.___frt.Catalog = class {
    static load_more() {
        let i1 = setInterval(() => {
            let buttons = [...document.getElementsByTagName('button')];
            buttons = buttons.filter(b => b.innerText.toLowerCase() === 'загрузить ещё');

            if (buttons.length === 0) {
                clearInterval(i1);
                console.info('loaded');
                this.filter();
                this.sort();
            }

            buttons.pop()?.click();
        }, 4444);
    }

    static filter() {
        let items = Array.from(document.querySelectorAll('.sku-card-small-container'));

        items
            .filter(i => i.querySelector('button') === null)
            .map(i => i.remove());
    }

    static sort() {
        let items = Array.from(document.querySelectorAll('.sku-card-small-container'));

        items
            .sort((item1, item2) => {
                let price1 = window.___frt.CatalogItem.price_per_gram(item1);
                let price2 = window.___frt.CatalogItem.price_per_gram(item2);
                return price1 - price2;
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }
};

window.___frt.CatalogItem = class {
    /**
     * @param {HTMLElement} item
     * @returns {number}
     */
    static get_price(item) {
        let price1 = item.querySelector('.price-label__integer')?.innerText;
        let price2 = item.querySelector('.price-label__fraction')?.innerText;

        if (!price1) return 0;
        if (!price2) price2 = 0;

        return parseFloat(price1 + '.' + price2);
    }

    /**
     * @param {HTMLElement} item
     * @returns {number}
     */
    static get_weight(item) {
        let sub_title = item.querySelector('.sku-card-small-header__sub-title').innerText.split(',');

        if (sub_title.length < 2) {
            sub_title = item.querySelector('.sku-card-small-header__title').innerText.split(',');
        }

        if (sub_title.length < 2) {
            return 1;
        }

        let weight = parseFloat(sub_title.at(-1).trim());

        if (sub_title[1].endsWith('л')) weight = weight * 1000;
        if (sub_title[1].endsWith('кг')) weight = weight * 1000;
        if (sub_title[1].endsWith('шт')) weight = weight * 1000;
        if (sub_title[1].endsWith('уп')) weight = weight * 1000;

        return weight;
    }

    /**
     *
     * @param {HTMLElement} item
     * @returns {number}
     */
    static price_per_gram(item) {
        try {
            return this.get_price(item) / this.get_weight(item);
        } catch (e) {
            console.error(e);
            window.t1 = item;
            return 0;
        }
    }
};
