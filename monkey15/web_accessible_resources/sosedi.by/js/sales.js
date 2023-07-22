Array.prototype.frtRemoveDuplicates = window._frt.ext.Array.frtRemoveDuplicates;
if (!window.___frt) window.___frt = {};

/* eslint-disable no-unused-vars */
window.___frt.Catalog = class {
    static filter() {
        for (const el of document.querySelectorAll('div.product-item')) {

            let price = window.___frt.CatalogItem.getPricePerKg(el);
            let card;

            switch (true) {
                case price < 3.55:
                    card = el?.querySelector('.v-card');
                    if (card) card.style.border = '1mm dotted';
                    break;
                case price < 5.55:
                    card = el?.querySelector('.v-card');
                    if (card) card.style.border = '1mm solid lightgreen';
                    break;
                case price < 10.55:
                    card = el?.querySelector('.v-card');
                    if (card) card.style.border = '1mm solid green';
                    break;
                case price < 13.55:
                    card = el?.querySelector('.v-card');
                    if (card) card.style.border = '1mm solid yellow';
                    break;
                case price < 15.55:
                    card = el?.querySelector('.v-card');
                    if (card) card.style.border = '1mm solid red';
                    break;
                default:
                    card = el?.querySelector('.v-card');
                    if (card) card.style.border = '1mm solid black';
            }

            let span = document.createElement('span');
            span.innerHTML = price;
            span.className = 'price-per-kg';
            span.style.position = 'absolute';
            span.style.bottom = '10px';
            span.style.left = '15px';

            el.querySelector('span.price-per-kg')?.remove();
            el.style.position = 'relative';
            el.insertAdjacentElement('beforeend', span);
        }
    }

    static reSort() {
        window.___frt.Cart.reAttachEvent();

        let items = document.querySelectorAll('div.product-item');
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

    static drawButtonOnListing () {
        let sortButton = document.createElement('button');
        sortButton.id = '___frt_sorter';
        sortButton.innerText = 'Sort';

        sortButton.onclick = (() => {
            this.filter();
            this.reSort();
        }).bind(this);

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
};

window.___frt.CatalogItem = class {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    static getWeight(item) {
        let matches;

        let titleElement = item.querySelector('.product-title');
        if (!titleElement) return 1;

        // 8*62.5г || 20х1,8 г
        matches = titleElement.innerText.match(/(\d+[*xх][\d.,]+)\s*(г)$/ui);
        if (matches) {
            let match = matches[1].replace(',','.');
            match = match.replace('x','*').replace('х','*')
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
        let price = parseFloat(`${item.querySelector('.price-rub').innerText}.${item.querySelector('.price-coins').innerText}`);

        return price / this.getWeight(item);
    }
};

window.___frt.Cart = class {
    static drawCartArea() {
        let cart = document.createElement('textarea');
        cart.id = '---frt-cart';
        cart.ariaLabel = '---frt-cart';

        cart.style.width = '100%';
        cart.style.height = '5cm';
        cart.style.padding = '3mm';
        cart.style.border = '1mm solid #555';
        document.getElementById('footer').insertAdjacentElement('beforeend', cart);
    }

    static addToCart(event) {
        let button = event.target;
        let card = window._frt.utils.findParentByClassName(button, ['product-item']);
        let price1 = card.querySelector('.price-rub').innerText;
        let price2 = card.querySelector('.price-coins').innerText;
        let title = card.querySelector('.product-title').innerText;

        /** @type {string[]} */
        let items = document.getElementById('---frt-cart').value.split('\n');
        items.push(`${title} (${price1}.${price2})`);
        items = items.filter(i => i)
                     .sort()
                     .frtRemoveDuplicates();

        /** @type {HTMLTextAreaElement} */
        let cart = document.getElementById('---frt-cart');
        cart.value = items.join('\n');
        cart.style.height = cart.value ? `${cart.scrollHeight + 5}px` : 'auto';
    }

    static reAttachEvent() {
        for (const button of document.querySelectorAll('.btn-add-to-card')) {
            button.onclick = this.addToCart;
        }
    }
};

window.___frt.Catalog.filter();
window.___frt.Catalog.reSort();
window.___frt.Catalog.drawButtonOnListing();

window.___frt.Cart.drawCartArea();
