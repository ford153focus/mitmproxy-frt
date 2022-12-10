String.prototype.frtRemoveSpaces = function () {
    return this.trim()
               .frtFixSpaces()
               .replaceAll(' ', '');
};

class DixyCatalogItem {
    static getPricePerKg(item) {
        let nonKiloUnits = ['г', 'мг', 'мл', 'г/мл'];

        // get price
        let priceTxt = item.querySelector('.dixyCatalogItemPrice__new').innerText.frtRemoveSpaces();
        let price = parseInt(priceTxt);

        // get weight
        let title = item.querySelector('[itemprop="description"]'); // full string with weight is in description
        if (!title) {title = item.querySelector('[itemprop="name"]');} // but sometimes description is not exists
        title = title.innerText;
        title = title.trim().toLowerCase().frtFixSpaces().replace(',', '.'); // prepare string

        let matches = title.match(/(\d+,?\.?\/?-?\+?\d*)\s?([а-я/]*)$/);

        if (matches === null) {
            console.error('failed to get weight: ', title);
            return 1;
        }

        let weightValue = parseFloat(matches[1]); // parse weight value
        let weightUnit = matches[2]; // parse weight unit

        if (isNaN(weightValue)) {
            weightValue = 1;
            console.error('failed to get weight value: ', title);
        }
        if (nonKiloUnits.includes(weightUnit)) weightValue /= 1000; // if weight is not in kilos - decrease weight value

        return price / weightValue;
    }
}

class DixyCatalogCart {
    drawCartArea() {
        document.querySelector('.filter-panel').insertAdjacentHTML('afterend', `
            <textarea id="cart-list"></textarea>
            <button id="cart-clear">Clear</button>
        `);

        document.getElementById('cart-clear').onclick = () => {
            document.getElementById('cart-list').innerHTML = '';
        };
    }

    addItemToCart(event) {
        if (event.pointerType!=='mouse') return;

        let itemprop = event.target.getAttribute('itemprop');
        if (itemprop!=='name' && itemprop!=='description') return;

        let itemTitle = event.target.innerText;
        if (!itemTitle) return;
        itemTitle = itemTitle.replaceAll('&nbsp;', '');

        let parent = event.target.parentElement;
        let oldPrice = parent.querySelector('.dixyCatalogItemPrice__oldprice').innerText.frtRemoveSpaces();
        let discount = parent.querySelector('.dixyCatalogItemPrice__discount').innerText.frtRemoveSpaces();
        let newPrice = parent.querySelector('.dixyCatalogItemPrice__new').innerText.frtRemoveSpaces();

        let text = `${itemTitle} (${oldPrice}|${discount}|${newPrice})`.frtFixSpaces().trim();

        let cart = document.getElementById('cart-list');
        let cartArray = cart.innerHTML.split('\n').map(item => item.frtFixSpaces().trim());
        if (cartArray.includes(text)) return; //check duplicate
        cartArray.push(text);
        cartArray = cartArray.sort();
        cart.innerHTML = cartArray.filter(el => el).join('\n'); //fill area

        /** resize area */
        cart.cols=Math.max(...(cartArray.map(el => el.length)));
        cart.rows=cartArray.length;
    }

    constructor () {
        document.body.onclick = this.addItemToCart;
    }
}

class DixyCatalog {
    loadMore() {
        let interval = setInterval(() => {
            let st = document.documentElement.scrollTop;
            let btn = document.querySelector('a.btn.view-more');
            if (btn) btn.click();
            setTimeout(() => {
                document.documentElement.scrollTop = st;
            }, 531);

            let items=document.querySelectorAll('div.dixyCatalogItem');
            let discount = items[items.length-1].querySelector('div.dixyCatalogItemPrice__discount').innerText.replaceAll(/\s/g,'');
            // noinspection DynamicallyGeneratedCodeJS
            discount = discount.includes('+') ? 0-100/eval(discount) : parseInt(discount);
            if (discount>-30) { // if discount less than 30% - exit
                clearInterval(interval);
                console.log('Sorting...');
                this.sort();
            }
        }, 3510);
    }

    sort() {
        let items = document.querySelectorAll('[itemtype="http://schema.org/Product"]');
        if (items.length === 0) return;
        items = Array.from(items);
        items
            .sort((item1, item2) => {
                return DixyCatalogItem.getPricePerKg(item1) - DixyCatalogItem.getPricePerKg(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    constructor () {
        document.querySelector('[data-sort="discount"]').click();
    }
}

class Dixy {
    constructor () {
        let cart = new DixyCatalogCart();
        cart.drawCartArea();

        let catalog = new DixyCatalog();
        catalog.loadMore();
    }
}

window.___frt_Dixy = new Dixy();
