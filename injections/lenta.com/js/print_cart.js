for (let item of document.querySelectorAll('.sku-card-in-basket')) {
    let title = item.querySelector('.sku-title-in-basket').innerText;
    let newPrice = item.querySelector('.sku-prices-block__item.sku-prices-block__item--primary .price-label__integer').innerText;
    let oldPrice = item.querySelector('.sku-prices-block__item.sku-prices-block__item--regular .price-label__integer').innerText;
    console.log(`${title} === ${newPrice} === ${oldPrice}`);
}
