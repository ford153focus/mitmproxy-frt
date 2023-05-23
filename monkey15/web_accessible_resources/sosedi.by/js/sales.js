if (!window.___frt) window.___frt = {};

/* eslint-disable no-unused-vars */
window.___frt.Catalog = class {
    static filter() {
        for (const el of document.querySelectorAll('div.product-item')) {

            let price = window.___frt.CatalogItem.getPricePerKg(el);

            switch (true) {
                case price < 3.55:
                    el?.querySelector('.v-card')?.frtSetStyle('border', '1mm solid green');
                    break;
                case price < 5.55:
                    el?.querySelector('.v-card')?.frtSetStyle('border', '1mm solid lightgreen');
                    break;
                case price < 10.55:
                    el?.querySelector('.v-card')?.frtSetStyle('border', '1mm solid green');
                    break;
                case price < 13.55:
                    el?.querySelector('.v-card')?.frtSetStyle('border', '1mm solid yellow');
                    break;
                case price < 15.55:
                    el?.querySelector('.v-card')?.frtSetStyle('border', '1mm solid red');
                    break;
                default:
                    el?.querySelector('.v-card')?.frtSetStyle('border', '1mm solid black');
            }
        }
    }

    static reSort() {
        let items = document.querySelectorAll('div.product-item').frtToArray();
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

        document.body.insertAdjacentElement('beforeEnd', sortButton);
    }
};

window.___frt.CatalogItem = class {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    static getPricePerKg(item) {
        let price = parseFloat(`${item.querySelector('.price-rub').innerText}.${item.querySelector('.price-coins').innerText}`);


        let title_match = item.querySelector('.product-title').innerText.match(/([\d]+[\.\,]?[\d]*)\s?([кгмлКГМЛ]+)/);
        if (title_match === null) return price;

        let weigth_value = parseFloat(title_match[1].replace(',','.').replace(/^\./, ''));
        let weigth_unit = title_match[2].toLowerCase();

        if (this.nonKiloUnits.includes(weigth_unit)) {
            weigth_value = weigth_value / 1000;
        }

        return price / weigth_value;
    }
};

window.___frt.Catalog.filter();
window.___frt.Catalog.reSort();
window.___frt.Catalog.drawButtonOnListing();
