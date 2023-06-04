if (!window.___frt) window.___frt = {};

window.___frt.print_cart = () => {
    for (let item of document.querySelectorAll('.list-products-item')) {
        let name = item.querySelector('.item-name').innerText.replaceAll('\n', '___');
        let price = item.querySelector('.item-price').innerText.replaceAll('\n', ' ');
        console.log(`${name} ----- ${price}`);
    }
};

window.___frt.print_cart();
