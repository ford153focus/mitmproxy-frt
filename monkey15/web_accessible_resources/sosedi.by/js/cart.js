[...document.querySelectorAll('.list-products-item')].forEach(item => {
    console.log(`${item.querySelector('.item-name').innerText.replaceAll('\n', '___')} ----- ${item.querySelector('.item-price').innerText.replaceAll('\n', ' ')}`);
});
