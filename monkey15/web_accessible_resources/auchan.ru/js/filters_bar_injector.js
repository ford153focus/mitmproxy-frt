fetch('https://example.com/___frt/injections/auchan.ru/html/filters-bar.html')
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector('h1').parentElement.insertAdjacentHTML('beforeend', data);
    })
    .catch((err) => {
        console.log(err);
    });
