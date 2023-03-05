let products = document.querySelectorAll('.catalog-list > .catalog-list__item');

[...products]
    .sort((product1, product2) => {
        let price1 = product1.querySelector('.catalog-item__add-to-cart').innerText.replace(/^\+/ , '').replaceAll(/ /g , '');
        let price2 = product2.querySelector('.catalog-item__add-to-cart').innerText.replace(/^\+/ , '').replaceAll(/ /g , '');

        let weight1 = product1.querySelector('.catalog-item__weight').innerText;
        let weight2 = product2.querySelector('.catalog-item__weight').innerText;

        price1 = parseInt(price1);
        price2 = parseInt(price2);

        let ratio1 = price1/weight1;
        let ratio2 = price2/weight2;

        return ratio1 - ratio2;
    })
    .map(item => products[0].parentElement.appendChild(item));
