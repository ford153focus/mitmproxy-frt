class Catalog {
    static setSorting() {
        document.querySelector('[value="price_promo_min"]')?.click();
    }

    static async loadMore() {
        const loadMoreInterval = setInterval(() => {
            let addMoreButton = document.querySelector('button.add-more-btn');
            if (addMoreButton === null) {
                clearInterval(loadMoreInterval);
                Catalog.removeMinorDiscounts();
                Catalog.sortByPricePerKilo();
                Catalog.fixTitles();
                Catalog.drawCartButton();
                return;
            }
            addMoreButton.click();
        }, 1530);


    }

    static removeMinorDiscounts() {
        let items = document.querySelectorAll('div.product-card.item');
        for (const item of items) {
            if (item.querySelector('div.discount-hint').innerText.frtToInt() > -30) {
                item.remove();
            }
        }
    }

    static sortByPricePerKilo() {
        let items = document.querySelectorAll('div.product-card.item').frtToArray();

        items
            .sort((item1, item2) => {
                return CatalogItem.getPricePerKg(item1) - CatalogItem.getPricePerKg(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    static fixTitles() {
        let items = document.querySelectorAll('div.product-card.item').frtToArray();

        for (const item of items) {
            item.querySelector('div.item-name').innerHTML = item.querySelector('img').alt.trim();
            item.querySelector('div.item-name').style['-webkit-line-clamp'] = 'unset';
        }
    }

    static drawCartButton() {
        let items = document.querySelectorAll('div.product-card.item').frtToArray();
        for (const item of items) {
            item.style.position = 'relative';

            let link = document.createElement('a');
            link.innerText = '➕';
            link.style.position = 'absolute';
            link.style.top = '0';
            link.style.right = '0';
            link.onclick = (event) => {
                let item = event.target.parentElement;
                let itemName = item.querySelector('div.item-name').innerText;
                let priceDiscount = item.querySelector('.price-discount > span').innerText;
                let priceDiscountCents = item.querySelector('.price-discount_cents').innerText;
                let priceRegular = item.querySelector('.price-regular').innerText;

                if (!window.cart) window.cart = [];
                window.cart.push(`${itemName} | ${priceDiscount}.${priceDiscountCents} | ${priceRegular}`);
            };

            item.appendChild(link);
        }
    }
}

class CatalogItem {
    static nonKiloUnits = ['г', 'гр', 'мг', 'мл'];

    static getPrice(item) {
        return item.querySelector('.price-discount > span').innerText.frtFixSpaces().replace(' ', '').trim().frtToInt();
    }

    static getWeight(item) {
        let matches = item.querySelector('img').alt.match(/([0-9]+,?\.?[0-9]*)\s?([А-я]+)\.?$/);

        if (matches === null || matches.length < 3) {
            return 1;
        }

        let weightValue = matches[1].frtFixSpaces().replace(' ', '').replace(',', '.').trim().frtToFloat();
        let weightUnit = matches[2].frtFixSpaces().replace(' ', '').trim();

        if (isNaN(weightValue)) {
            weightValue = 1;
            console.error('failed to get weight value: ', item.querySelector('img').alt);
        }

        if (CatalogItem.nonKiloUnits.includes(weightUnit)) weightValue /= 1000;

        return weightValue;
    }

    static getPricePerKg(item) {
        return CatalogItem.getPrice(item) / CatalogItem.getWeight(item);
    }
}

(() => {
    Catalog.loadMore();
})();
