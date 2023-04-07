let products = document.querySelectorAll('.container .card-animation-wrapper.col-auto');

[...products]
    .sort((product1, product2) => {
        let price1 = product1.querySelector('.price > span').innerText;
        let weight1 = product1.querySelector('.weight').innerText;
        let ratio1 = parseInt(price1)/parseInt(weight1);

        let price2 = product2.querySelector('.price > span').innerText;
        let weight2 = product2.querySelector('.weight').innerText;
        let ratio2 = parseInt(price2)/parseInt(weight2);

        return ratio1 - ratio2;
    })
    .map(item => products[0].parentElement.appendChild(item));
