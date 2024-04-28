function print_cart() {
    setTimeout(() => {
        let text = [];

        for (const product of document.querySelectorAll('[class^=Cart_root] > [class^=Cart_content] > [class^=Cart_product]')) {
            let title = product.querySelector('[class^=Cart_product__title]')?.innerText;
            let weight = product.querySelector('[class^=Cart_product__weight]')?.innerText;
            let price = product.querySelector('[class^=Cart_product__price-current]')?.innerText;
            text.push(`${title} (${weight} X ${price})`);
        }

        console.log(text.sort().join('\n'));
    }, 1530);
}

setTimeout(() => {
    for (const cat_button of document.querySelectorAll('[data-gtm-id="AddToCartButton"]')) {
        cat_button.addEventListener('click', (event) => {
            print_cart();
        });
    }

    print_cart();
}, 333);
