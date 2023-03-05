let products = document.querySelectorAll('[itemtype="https://schema.org/Product"]');

[...products]
    .sort((product1, product2) => {
        let weight1 = product1.querySelector('[itemtype="https://schema.org/description"] span').innerText;
        let weight2 = product2.querySelector('[itemtype="https://schema.org/description"] span').innerText;

        let price1 = product1.querySelector('[itemtype="https://schema.org/priceCurrency"]').innerText;
        let price2 = product2.querySelector('[itemtype="https://schema.org/priceCurrency"]').innerText;

        let ratio1 = parseInt(price1)/parseInt(weight1);
        let ratio2 = parseInt(price2)/parseInt(weight2);

        return ratio1 - ratio2;
    })
    .map(item => products[0].parentElement.appendChild(item));
