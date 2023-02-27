class Sorter {
    constructor() {
        this.DEBUG = false;
        this.loadMoreButtonSelector = '.catalog__pagination button';
        this.itemPriceSelector = 'span[itemprop="price"]';
        this.itemWeightSelector = 'div.product-weight';
        this.itemsSelector = 'ul.grid_mode.grid.rows > li';

        this.switchSorting();
        // this.loadMoreInterval = setInterval(() => { this.loadMore(); }, 1530);
        setTimeout(() => {
            this.reSort();
        }, 5310);
    }

    switchSorting() {
        document
            .querySelector('table[id^=\'orderBy\']')
            .dispatchEvent(
                new CustomEvent('mousedown')
            );

        for (const el of document.querySelectorAll('*')) {
            if (el.innerText !== 'цене по возрастанию') continue;
            el.click();
        }
    }

    loadMore() {
        console.log('Loading...');
        let loadMoreButton = document.querySelector(this.loadMoreButtonSelector);
        let catalogItems = document.querySelectorAll(this.itemsSelector);
        let lastItemPrice = this.getPrice([...catalogItems].slice(-1)[0]);
        if (loadMoreButton === null || lastItemPrice > 987) {
            console.log('catalog end reached');
            clearInterval(this.loadMoreInterval);
            this.reSort();
            return;
        }
        loadMoreButton.click();
    }

    getPrice(item) {
        let priceElmnt = item.querySelector(this.itemPriceSelector);
        let priceTxt = priceElmnt.innerText
            .trim()
            .replace(String.fromCharCode(160), '')
            .replace(' ', '')
            .replace(',', '.')
            .match(/\d+(\.\d+)?/)[0];
        // noinspection UnnecessaryLocalVariableJS
        let price = parseFloat(priceTxt);
        return price;
    }

    getWeight(item) {
        let weightElement = item.querySelector(this.itemWeightSelector);
        let weightTxt = weightElement.innerText
            .trim()
            .replace(String.fromCharCode(160), '')
            .replace(' ', '')
            .replace(',', '.');
        let weight = weightTxt.match(/(\d+\.?,?\d*)\s*(L|г|кг|л|мл|уп|шт)?/i);
        if (!weight) {
            return 1;
        }
        let weightValue = parseFloat(weight[1].replace(',', '.'));
        let weightUnit = weight[2] ? weight[2].toLowerCase() : 'г';
        let kiloUnits = ['l', 'кг', 'л', 'уп', 'шт'];
        if (!kiloUnits.includes(weightUnit)) {
            weightValue /= 1000;
        }
        return weightValue;
    }

    reSort() {
        console.log('Sorting...');
        let timer = performance.now();
        let items = document.querySelectorAll(this.itemsSelector);
        [...items]
            .sort((item1, item2) => {
                return this.getPrice(item1) / this.getWeight(item1) - this.getPrice(item2) / this.getWeight(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
        console.log(`Sorted in ${((performance.now() - timer) / 1000).toFixed(3)} seconds`);
    }
}

// noinspection ObjectAllocationIgnored
new Sorter();
