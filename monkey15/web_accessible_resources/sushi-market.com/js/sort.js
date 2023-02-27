let products = document.querySelectorAll('.cardsList > .menu-item');

[...products]
    .sort((product1, product2) => {
        let price1 = product1.querySelector('.goodsBlockPrice').innerText;
        let price2 = product2.querySelector('.goodsBlockPrice').innerText;

        let weight1 = product1.querySelector('.goodsBlockWeight').innerText;
        let weight2 = product2.querySelector('.goodsBlockWeight').innerText;

        price1 = parseInt(price1);
        price2 = parseInt(price2);

        weight1 = weight1.endsWith('кг') ? parseFloat(weight1)*1000 : parseInt(weight1);
        weight2 = weight2.endsWith('кг') ? parseFloat(weight2)*1000 : parseInt(weight2);

        let ratio1 = parseInt(price1)/parseInt(weight1);
        let ratio2 = parseInt(price2)/parseInt(weight2);

        return ratio1 - ratio2;
    })
    .map(item => products[0].parentElement.appendChild(item));
