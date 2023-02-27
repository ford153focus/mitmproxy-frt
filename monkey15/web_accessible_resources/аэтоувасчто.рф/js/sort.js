let products = document.querySelectorAll('.gt-grid.gt-grid-3 > .gt-grid-col');

[...products]
    .sort((product1, product2) => {
        let price1 = product1.querySelector('.woocommerce-Price-amount').innerText;
        let price2 = product2.querySelector('.woocommerce-Price-amount').innerText;

        let weight1 = product1.querySelector('.gt-title').innerText.match(/\((\d+)г/)[1];
        let weight2 = product2.querySelector('.gt-title').innerText.match(/\((\d+)г/)[1];

        price1 = parseInt(price1);
        price2 = parseInt(price2);

        weight1 = parseInt(weight1);
        weight2 = parseInt(weight2);

        let ratio1 = parseInt(price1)/parseInt(weight1);
        let ratio2 = parseInt(price2)/parseInt(weight2);

        return ratio1 - ratio2;
    })
    .map(item => products[0].parentElement.appendChild(item));
