class FrtCatalog {
    // noinspection JSUnusedGlobalSymbols
    sortSwitcher() {
        if (document.location.href.includes('https://lenta.com/search/?searchText=')) return;
        if (document.querySelector('.catalog-sorting .dropdown__toggle .dropdown__label').innerText === 'Сначала дешевые') return;

        document.querySelector('a[data-value="ByPriceAsc"]').click();
        setTimeout(() => { window.location.reload(); }, 333);
    }

    filter() {
        let items = document.querySelectorAll('.catalog-grid__grid .sku-card-small-container');

        for (const item of items) {
            if (item.querySelector('.sku-card-small__not-available-notice') !== null) {
                item.remove();
            }
            if (item.querySelector('.sku-card-status-notice.sku-card-small__status-notice') !== null) {
                item.remove();
            }
        }
    }

    /**
     * Main sorter
     */
    reSort() {
        let items = document.querySelectorAll('.catalog-grid__grid .sku-card-small-container');
        if (items.length === 0) return;
        items = Array.from(items);

        items
            .sort((item1, item2) => {
                let pricePerKg1 = FrtCatalogItem.getPrice(item1)/FrtCatalogItem.getWeight(item1);
                let pricePerKg2 = FrtCatalogItem.getPrice(item2)/FrtCatalogItem.getWeight(item2);
                return pricePerKg1 - pricePerKg2;
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    loadMore() {
        let loadMoreButton = Array.from(document.getElementsByTagName('button')).filter(el => el.innerText?.trim().toLowerCase() === 'загрузить ещё');
        if (loadMoreButton.length === 0) {
            return false;
        } else {
            loadMoreButton.pop()?.click();
            return true;
        }
    }

    constructor() {
        let interval1 = setInterval(() => {
            let lm = this.loadMore();
            if (!lm) {
                clearInterval(interval1);
                this.filter();
                this.reSort();
            }
        }, 4444);
    }
}

class FrtCatalogItem {
    static getPrice(item) {
        window.t1 = item; // 4 debug

        let priceInteger = item.querySelector('.price-label .price-label__integer').innerText;
        let priceFraction = item.querySelector('.price-label .price-label__fraction').innerText;

        priceInteger = priceInteger.replaceAll(' ', '').replaceAll(' ', '').trim();
        priceFraction = priceFraction.replaceAll(' ', '').replaceAll(' ', '').trim();

        return parseFloat(`${priceInteger}.${priceFraction}`);
    }

    static getWeight(item) {
        window.t2 = item; // 4 debug

        let weightTxt = item.querySelector('.sku-card-small-header__sub-title');
        if (!weightTxt) return 1;
        weightTxt = weightTxt.innerText.trim().toLowerCase().split(',');
        if (weightTxt.length > 1) weightTxt.shift(); // drop country name
        weightTxt = weightTxt.join(',');
        let weightValue = weightTxt.split(' ').at(0).replace(',', '.'); // first segment is value
        let weightUnit = weightTxt.split(' ').at(-1); // last segment is unit
        // noinspection DynamicallyGeneratedCodeJS
        weightValue = weightValue.includes('*') ? eval(weightValue) : parseFloat(weightValue);
        if (isNaN(weightValue)) return 1;

        let nonKiloUnits = ['г', 'мг', 'мл'];
        if (nonKiloUnits.includes(weightUnit)) {
            weightValue /= 1000;
        }

        return weightValue;
    }
}

setTimeout(() => {
    window.___frt = new FrtCatalog();
}, 5);
