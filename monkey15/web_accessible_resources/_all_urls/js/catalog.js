// noinspection JSUnusedGlobalSymbols
HTMLCollection.prototype.frtToArray = window._frt.ext.HTMLCollection.frtToArray;
if (!window.___frt) window.___frt = {};

/* eslint-disable no-unused-vars */
window.___frt.Catalog = class {
    /** @abstract */
    settingsSwitcher() {}

    loadMore() {
        return new Promise(function(resolve) {
            setInterval(function() {
                let loadMoreButton = Array.from(document.getElementsByTagName('button')).filter(el => el.innerText?.trim().toLowerCase() === 'загрузить ещё');
                if (loadMoreButton.length === 0) resolve('Loaded');
                loadMoreButton.pop()?.click();
            }, 1000);
        });
    }

    /** @abstract */
    filter() {}

    reSort() {
        let items = document.querySelectorAll('selector').frtToArray();
        if (items.length === 0) return;

        items
            .sort((item1, item2) => {
                return CatalogItem.getPricePerKg(item1) - CatalogItem.getPricePerKg(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    async init() {
        this.settingsSwitcher();
        await this.loadMore();
    }
};

class CatalogItem {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    /** @abstract */
    getWeight(item) {}

    /** @abstract */
    getPrice(item) {}

    getPricePerKg(item) {
        return this.getWeight(item)/this.getPrice(item);
    }
}
