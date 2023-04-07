class DixyCatalogItem {
    static getPrice(item) {
        let priceTxt = item.querySelector('.dixyCatalogItemPrice__new').innerText.frtRemoveSpaces();
        return parseInt(priceTxt);
    }

    static getWeight(item) {
        let description = item.querySelector('[itemprop="description"]'); // ususally description contains full title with weight
        let name = item.querySelector('[itemprop="name"]'); // but sometimes description is not exists
        let title = description !== null ? description.innerText : name.innerText;
        title = title.trim().toLowerCase().frtFixSpaces().replace(',', '.'); // prepare string

        let matches;

        matches = title.match(/(\d+)\s*(г|мл|мг)/i);
        if (matches !== null) return parseFloat(matches[1])/1000;

        matches = title.match(/(\d*\.?\d+)\s*(кг|л)/i);
        if (matches !== null) return parseFloat(matches[1]);

        /**
         * 1 tea packet is 2 gramm usually, so there is 500 packets in 1 kilo
         */
        matches = title.match(/чай.+(\d+)\s*шт/i);
        if (matches !== null) return parseFloat(matches[1])/500;

        console.warn('failed to get weight: ', title);
        return 1;
    }

    static getPricePerKg(item) {
        return DixyCatalogItem.getPrice(item) / DixyCatalogItem.getWeight(item);
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
    static loadMore() {
        let interval = setInterval(() => {
            window.___frt.loading = 1;
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
            discount = -31;
            if (discount>-30 || btn===null) { // if discount less than 30% - exit
                clearInterval(interval);
                window.___frt.loading = 0;
                console.log('Sorting...');
                DixyCatalog.sort();
            }
        }, 3510);
    }

    static sort() {
        let items = document.querySelectorAll('[itemtype="https://schema.org/Product"]');
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

    static switchSort () {
        document.querySelector('[data-sort="discount"]').click();
    }

    static setObserver() {
        if (window.___frt.observer) return;

        const config = {
            attributes: true,
            childList: true,
            subtree: true
        };

        window.___frt.observer = new MutationObserver(DixyCatalog.observerCallback);
        window.___frt.observer.observe(document.body, config);
    }

    static observerCallback() {
        if (document.querySelector('a.btn.view-more') === null) return;
        if (window.___frt.loading === 1) return;

        DixyCatalog.loadMore();
    }
}

class Dixy {
    constructor () {
        let cart = new DixyCatalogCart();
        cart.drawCartArea();

        DixyCatalog.switchSort();
        DixyCatalog.loadMore();

        window.___frt.loading = 1;
        DixyCatalog.setObserver();
    }
}

if (!window.___frt) window.___frt = {};
window.___frt.catalog = new Dixy();
