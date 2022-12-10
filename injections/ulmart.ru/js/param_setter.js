setTimeout(() => {
    /**
     * Set filter params
     */
    if (!document.querySelector('[name="functionality"][value="1"]').checked) {
        document.querySelector('[name="functionality"][value="1"]').click(); // "полностью исправен"
        document.querySelector('div.fly_but.checktype button').click(); // "Показать"
    }

    /**
     * Set view param
     */
    if (!document.getElementById('viewType0').className.includes('cur')) {
        document.getElementById('viewType0').click();
    }

    /**
     * Set sorting param
     */
    if (document.querySelector('#category_sort_modes select').selectedIndex !== 1) {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', false, true);

        document.querySelector('#category_sort_modes select').selectedIndex = 1;
        document.querySelector('#category_sort_modes select').dispatchEvent(evt);
    }
}, 5310);
