setTimeout(() => {
    document.querySelector('div.filters.tooltipster-block').insertAdjacentHTML(
        'beforeend',
        '<div class="button tooltipster-button" id="filter-all-big">All big</div>'
    );


    document.getElementById('filter-all-big').addEventListener('click', function () {
        for (const size of document.querySelectorAll('div[name="size"]')) {
            size.querySelector('button:last-of-type').click();
        }
    });
}, 5310);
