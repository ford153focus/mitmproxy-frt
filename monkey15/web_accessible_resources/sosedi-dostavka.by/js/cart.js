function print_cart() {
    setTimeout(() => {
        let text = [];

        for (const product of document.querySelectorAll('[class^=Cart_root] > [class^=Cart_content] > [class^=Cart_product]')) {
            let title = product.querySelector('[class^=Cart_product__title]')?.innerText;
            let weight = product.querySelector('[class^=Cart_product__weight]')?.innerText;
            let price = product.querySelector('[class^=Cart_product__price-current]')?.innerText;

            if (title && title.startsWith('Доставка "30 минут"')) continue;
            if (title && title.startsWith('Доставка быстрая')) continue;
            if (title && title.startsWith('Пакет Бумажный с Ручкой')) continue;
            if (title && title.startsWith('УСЛУГА ДОСТАВКИ')) continue;

            text.push(`${title} (${weight} X ${price})`);
        }

        console.log(text.sort().join('\n'));
    }, 1530);
}

setTimeout(() => {
    for (const cat_button of document.querySelectorAll('[data-gtm-id="AddToCartButton"]')) {
        cat_button.addEventListener('click', () => {
            print_cart();
        });
    }

    print_cart();
}, 333);
