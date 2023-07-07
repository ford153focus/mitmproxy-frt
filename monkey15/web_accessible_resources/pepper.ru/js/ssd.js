if (!window.___frt) window.___frt = {};

window.___frt.PepperSsd = class {
    static calc() {
        let products = [...document.getElementsByTagName('article')];

        for (let product of products) {
            let price1 = product.querySelector('span.thread-price').innerText;
            let price2 = price1.replaceAll(/\s/g, '').replaceAll(',', '.');
            let price3 = parseFloat(price2);

            let title = product.querySelector('strong.thread-title').innerText;
            let volume1 = title.toLowerCase().match(/(\d+)\s*([gtгт][bб])/);
            let volume2 = parseFloat(volume1[1]);
            if (volume1[2] === 'тб') volume2 *= 1024;
            if (volume1[2] === 'tb') volume2 *= 1024;

            let ratio1 = (price3/volume2).toFixed(2);
            let ratio2 = `${ratio1}₽/Gb`;
            let ratio3 = `&nbsp;&nbsp;&nbsp;<span>(${ratio2})</span>`;

            product.querySelector('.overflow--fade .thread-divider').insertAdjacentHTML('beforebegin', ratio3);
            product.dataset['price_per_kg'] = ratio1;
        }
    }

    static sort() {
        this.calc();

        let products = [...document.getElementsByTagName('article')];

        products
            .sort((a,b) => {
                let price1 = parseFloat(a.dataset['price_per_kg']);
                let price2 = parseFloat(b.dataset['price_per_kg']);
                return price1-price2;
            })
            .map((product) => {
                products[0].parentElement.appendChild(product);
            });
    }

    static drawButtonOnListing () {
        let sortButton = document.createElement('button');
        sortButton.id = '___frt_sorter';
        sortButton.innerText = 'Sort by price per Gb';
        sortButton.onclick = this.sort.bind(this);
        sortButton.style['bottom'] = '3px';
        sortButton.style['display'] = 'block';
        sortButton.style['right'] = '3px';
        sortButton.style['position'] = 'fixed';
        sortButton.style['background-color'] = 'darkgrey';
        sortButton.type = 'button';

        document.body.insertAdjacentElement('beforeend', sortButton);
    }
};

setTimeout(() => {
    window.___frt.PepperSsd.drawButtonOnListing();
}, 333);
