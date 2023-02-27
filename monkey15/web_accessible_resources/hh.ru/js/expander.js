document.querySelector('h3.b-subtitle.b-employerpage-vacancies-title').innerHTML += `
    <a id="expandAll">Expand All</a>
    <a id="filterSpb">Spb only</a>
`;

document.getElementById('expandAll').onclick = () => {
    for (const notExpanded of document.querySelectorAll('.company-vacancies:not(.g-expand)')) {
        for (const el of notExpanded.querySelectorAll('h4 span.bloko-link-switch')) {
            el.click();
            window._frt.sleep(50);
        }
    }

    window._frt.sleep(150);

    for (const el of document.querySelectorAll('div.company-vacancies-group__title span.bloko-link-switch')) {
        el.click();
        window._frt.sleep(50);
    }
};

document.getElementById('filterSpb').onclick = () => {
    for (const el of document.querySelectorAll('div.vacancy-list-item')) {
        if (!el.querySelector('.b-vacancy-list-address').innerText.includes('Санкт-Петербург')) {
            el.style.display = 'none';
        }
    }
};
