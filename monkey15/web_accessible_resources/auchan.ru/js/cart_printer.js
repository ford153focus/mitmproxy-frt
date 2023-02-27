class Cart {
    static sort() {
        let items = document.querySelectorAll('#cartItemsList .cartItem');
        [...items]
            .sort((item1, item2) => {
                let cnl1 = item1.querySelector('a.cartCardNameLink').innerText.trim().toLocaleLowerCase();
                let cnl2 = item2.querySelector('a.cartCardNameLink').innerText.trim().toLocaleLowerCase();
                return cnl1.localeCompare(cnl2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    static print() {
        for (const el of document.querySelectorAll('article.cartCard')) {
            let cartCardName = el.querySelector('a.cartCardNameLink ').innerText;
            let cartCardFullPrice = el.querySelector('div.cartCardFullPrice')?.innerText;
            let cartCardOldPrice = el.querySelector('div.cartCardOldPrice')?.innerText;
            console.log(`${cartCardName} | ${cartCardFullPrice} | ${cartCardOldPrice}`);
        }
    }
}

setTimeout(() => {
    Cart.sort();
    Cart.print();
}, 1530);
