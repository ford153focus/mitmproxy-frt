if (!window.___frt) window.___frt = {};

window.___frt.Auchan = class {
    static getKiloPrice(item) {
        if (item.querySelector('article.hidden') !== null) return Number.MAX_SAFE_INTEGER;

        /** @type {HTMLDivElement} */
        let itemPriceEl = item.querySelector('div.productCardPriceData');

        let itemTxt = itemPriceEl.innerText
                                 .replaceAll(',', '.')
                                 .trim()
                                 .replaceAll(/(\d)\s(\d)/ig, '$1$2'); // drop the space in price

        let itemPrice = parseFloat(itemTxt);

        /** @type {HTMLAnchorElement} */
        let weightEl = item.querySelector('a.linkToPDP');
        let weightTxt = weightEl.innerText.replaceAll(',', '.').trim();

        let weightGram = parseInt(weightTxt.match(/\d+\s*(г|мл)?\.?$/gi)?.shift());
        if (weightGram) return itemPrice / weightGram * 1000;

        let weightKilo = parseFloat(weightTxt.match(/\d+\.?\d*\s*(л|кг|шт)\.?$/gi)?.shift());
        if (weightKilo) return itemPrice / weightKilo;

        return itemPrice;
    }

    static sort() {
        let items = document.querySelectorAll('div[class^="css-"][class$="-Item"]');
        [...items]
            .sort((item1, item2) => {
                return this.getKiloPrice(item1) - this.getKiloPrice(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    static filter() {
        let discountFrom = document.querySelector('#m15-discount-from input').value;
        let priceFrom = document.querySelector('#m15-price-from input').value;
        let priceTo = document.querySelector('#m15-price-to input').value;

        document.querySelector('#m15-discount-from span.value').innerHTML = discountFrom;
        document.querySelector('#m15-price-from span.value').innerHTML = priceFrom;
        document.querySelector('#m15-price-to span.value').innerHTML = priceTo;

        for (const item of document.querySelectorAll('div[class="css-n9ebcy-Item"]')) {
            let kiloPrice = this.getKiloPrice(item);
            let discount = Math.abs(parseInt(item.querySelector('span.discountValue')?.innerText));

            if (isNaN(discount)) discount = 0;


            switch (true) {
                case (discount < discountFrom):
                case (kiloPrice > priceTo):
                case (kiloPrice < priceFrom):
                    item.style.display='none';
                    break;
                default:
                    item.style.display='block';
            }

        }
    }
};
