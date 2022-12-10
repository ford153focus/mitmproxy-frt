let products = document.querySelectorAll('.catalog__items-list > .catalog__items-item');

[...products]
    .sort((product1, product2) => {
        let price1 = product1.querySelector('.catalog__items-item__price').innerText;
        let price2 = product2.querySelector('.catalog__items-item__price').innerText;

        let weight1 = product1.querySelector('.catalog__items-item__weight').innerText;
        let weight2 = product2.querySelector('.catalog__items-item__weight').innerText;

        price1 = parseInt(price1);
        price2 = parseInt(price2);

        weight1 = parseInt(weight1);
        weight2 = parseInt(weight2);

        let ratio1 = parseInt(price1)/parseInt(weight1);
        let ratio2 = parseInt(price2)/parseInt(weight2);

        return ratio1 - ratio2;
    })
    .map(item => products[0].parentElement.appendChild(item));
