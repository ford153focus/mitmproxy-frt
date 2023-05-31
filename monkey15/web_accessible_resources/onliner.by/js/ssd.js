if (!window.___frt) window.___frt = {};
if (!window.___frt.onliner) window.___frt.onliner = {};

window.___frt.onliner.PriceDefiner = class {
    static drawPricesOnListing () {
        for (let product of document.querySelectorAll('.schema-product__group'))
        {
            let desc = product.querySelector('[data-bind="html: product.description"]').innerText;
            let volume1 = desc.split(',')[0];
            let volume2 = parseFloat(volume1);
            if (volume1.endsWith('ТБ')) volume2 *= 1024;
            let price1 = product.querySelector('.schema-product__price-value').innerText;
            let price2 = price1.match(/\d+/g);
            let price3 = parseFloat(`${price2[0]}.${price2[1]}`);
            let ratio1 = (price3/volume2).toFixed(4);
            let ratio2 = `${ratio1} BYN/Gb`;

            let div = document.createElement('div');
            div.className = 'price-per-gb';
            div.innerText = ratio2;
            div.dataset['value']=ratio1;

            product.querySelector('div.price-per-gb')?.remove();
            product.querySelector('.schema-product__price').insertAdjacentElement('beforeEnd', div);
        }
    }

    static drawButtonOnListing () {
        let calcButton = document.createElement('button');
        calcButton.id = '___frt_calc';
        calcButton.innerText = 'Calc price per Gb';
        calcButton.onclick = this.drawPricesOnListing.bind(this);
        calcButton.style['bottom'] = '3px';
        calcButton.style['display'] = 'block';
        calcButton.style['right'] = '3px';
        calcButton.style['position'] = 'fixed';
        calcButton.style['z-index'] = '150';
        calcButton.type = 'button';

        let sortButton = document.createElement('button');
        sortButton.id = '___frt_sorter';
        sortButton.innerText = 'Sort by price per Gb';
        sortButton.onclick = this.sortingOnListing.bind(this);
        sortButton.style['bottom'] = '30px';
        sortButton.style['display'] = 'block';
        sortButton.style['right'] = '3px';
        sortButton.style['position'] = 'fixed';
        sortButton.style['z-index'] = '150';
        sortButton.type = 'button';

        document.body.insertAdjacentElement('beforeEnd', calcButton);
        document.body.insertAdjacentElement('beforeEnd', sortButton);
    }

    static sortingOnListing () {
        this.drawPricesOnListing();

        let products = [...document.querySelectorAll('.schema-product__group')];

        products
            .sort((a,b) => {
                let ratio1 = parseFloat(a.querySelector('div.price-per-gb').dataset['value']);
                let ratio2 = parseFloat(b.querySelector('div.price-per-gb').dataset['value']);
                return ratio1-ratio2;
            })
            .map((product) => {
                products[0].parentElement.appendChild(product);
            });
    }

    static drawPriceOnProductPage () {
        let price1 = document.querySelector('.offers-description__price-group').innerText.replaceAll(',', '.');
        let price2 = parseFloat(price1);

        let description = document.querySelector('.offers-description__specs').innerText;
        let volume1 = description.split(',')[0];
        let volume2 = parseFloat(volume1);
        if (volume1.endsWith('ТБ')) volume2 *= 1024;

        let ratio1 = (price2/volume2).toFixed(2);
        let ratio2 = `(${ratio1} BYN/Gb)`;

        let div = document.createElement('div');
        div.className = 'price-per-gb';
        div.style['font-size'] = '13px';
        div.innerText = ratio2;

        document.querySelector('.offers-description__price-group').insertAdjacentElement('beforeEnd', div);
    }
};

setTimeout(() => {
    if (document.getElementById('schema-products') !== null) {
        window.___frt.onliner.PriceDefiner.drawPricesOnListing();
        window.___frt.onliner.PriceDefiner.drawButtonOnListing();
    }

    if (document.querySelector('.product.product_details') !== null) {
        window.___frt.onliner.PriceDefiner.drawPriceOnProductPage();
    }
}, 333);
