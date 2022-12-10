function filterProcessedVacancies() {
    for (const keyword of ['rejected', 'invited', 'responded']) {
        let vacancies = document.querySelectorAll(`[data-qa="vacancy-serp__vacancy_${keyword}"]`);
        for (const vacancy of vacancies) {
            if (vacancy.href.search(/\d+$/) > -1) {
                vacancy.parentNode.parentNode.parentNode.remove();
            }
        }
    }
}

function filterUnwantedVacancies() {
    let keywords = [
        'кассир',
        'продавец'
    ];

    let vacancies = document.querySelectorAll('div.vacancy-serp-item');
    for (const vacancy of vacancies) {
        let vacancyTitle = vacancy.querySelector('[data-qa="vacancy-serp__vacancy-title"]')
                                   .innerText
                                   .toLowerCase();

        for (const keyword of keywords) {
            if (vacancyTitle.includes(keyword)) vacancy.style.display = 'none';
        }
    }
}

/*
document.querySelector('[name="search_period"]')
    .parentElement.parentElement
    .insertAdjacentHTML('afterEnd', `<div class="search-filters__item">
        <form>
            <a id="filterProccesed">Filter Proccesed</a>
        </form>
    </div>`);

document.getElementById('filterProccesed').onclick = filter
*/

filterProcessedVacancies();
filterUnwantedVacancies();
