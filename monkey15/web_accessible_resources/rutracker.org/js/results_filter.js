function drawShowButton() {
    document
        .getElementById('search-results')
        .insertAdjacentHTML(
            'beforeend',
            '<input class="bold" type="button" value="Show hidden" id="show-hidden" style="width: 140px;">'
        );

    document.getElementById('search-results').onclick = () => {
        for (let row of document.querySelectorAll('#search-results tbody tr')) {
            row.style.display = 'table-row';
        }
    };
}

/**
 * операционные системы - минус сборочки
 */
if (document.getElementById('title-search').value.toLowerCase().includes('windows')) {
    for (let row of document.querySelectorAll('#search-results tbody tr')) {
        let title = row.querySelector('td.t-title-col');
        if (title) {
            if (title.innerText.includes(' by ')) {
                row.style.display = 'none';
            }
            if (title.innerText.includes('Elgujakviso')) {
                row.style.display = 'none';
            }
        }
    }

    drawShowButton();
}
