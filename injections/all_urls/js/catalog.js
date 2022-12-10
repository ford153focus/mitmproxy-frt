/* eslint-disable no-unused-vars */
class Catalog {
    settingsSwitcher() {}

    loadMore() {
        return new Promise(function(resolve, reject) {
            setInterval(function() {
                let loadMoreButton = Array.from(document.getElementsByTagName('button')).filter(el => el.innerText?.trim().toLowerCase() === 'загрузить ещё');
                if (loadMoreButton.length === 0) resolve('Loaded');
                loadMoreButton.pop()?.click();
            }, 1000);
        });
    }

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
}

class CatalogItem {
    static nonKiloUnits = ['г', 'мг', 'мл'];

    getWeight(item) {}
    getPrice(item) {}

    getPricePerKg(item) {
        return this.getWeight(item)/this.getPrice(item);
    }
}
