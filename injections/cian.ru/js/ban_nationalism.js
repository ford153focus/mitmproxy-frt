setTimeout(async () => {
    if (window._frt.parseQueryString()['deal_type']!=='rent') return;

    for (let card of document.querySelectorAll('article[data-name="CardComponent"]')) {
        let description = card.querySelector('div[data-name="DescriptionComponent"] p');
        description = description.innerText.toLocaleLowerCase();
        if (description.includes('славян')) card.style.display = 'none';
        if (description.includes('русск')) card.style.display = 'none';
    }
}, 5);
