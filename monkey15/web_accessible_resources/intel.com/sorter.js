if (!window.___frt) window.___frt = {};

window.___frt.Sorter = class {
    draw_sort_button() {
        let sortButton = document.createElement('button');
        sortButton.id = '___frt_sorter';
        sortButton.innerText = 'Sort';

        sortButton.onclick = (() => {
            this.reSort();
        }).bind(this);

        sortButton.style['background-color'] = 'darkgray';
        sortButton.style['border-radius'] = '3mm';
        sortButton.style['border'] = '1mm solid black';
        sortButton.style['bottom'] = '15mm';
        sortButton.style['display'] = 'block';
        sortButton.style['left'] = '-5mm';
        sortButton.style['padding'] = '1mm 3mm';
        sortButton.style['position'] = 'fixed';
        sortButton.style['transform'] = 'rotate(90deg)';
        sortButton.style['z-index'] = '10';

        sortButton.type = 'button';

        document.body.insertAdjacentElement('beforeend', sortButton);
    }

    reSort() {
        HTMLCollection.prototype.frtToArray = window._frt.ext.HTMLCollection.frtToArray;
        NodeList.prototype.frtToArray = window._frt.ext.NodeList.frtToArray;
        String.prototype.frtToInt = window._frt.ext.String.frtToInt;

        let launch_date_column_num = document.getElementsByTagName('th').frtToArray().filter(el => el.innerText === 'Launch Date'             ).pop().dataset['column'].frtToInt();
        let total_cores_column_num = document.getElementsByTagName('th').frtToArray().filter(el => el.innerText === 'Total Cores'             ).pop().dataset['column'].frtToInt();
        let turbo_freq_column_num  = document.getElementsByTagName('th').frtToArray().filter(el => el.innerText === 'Max Turbo Frequency'     ).pop().dataset['column'].frtToInt();
        let base_freq_column_num   = document.getElementsByTagName('th').frtToArray().filter(el => el.innerText === 'Processor Base Frequency').pop().dataset['column'].frtToInt();
        let cache_column_num       = document.getElementsByTagName('th').frtToArray().filter(el => el.innerText === 'Cache'                   ).pop().dataset['column'].frtToInt();
        let tdp_column_num         = document.getElementsByTagName('th').frtToArray().filter(el => el.innerText === 'TDP'                     ).pop().dataset['column'].frtToInt();

        let rows = document.querySelectorAll('#product-table tbody tr').frtToArray();

        rows
            .sort((a,b) => {
                let value1 = parseInt(a.querySelectorAll('td')[tdp_column_num].dataset['value']);
                let value2 = parseInt(b.querySelectorAll('td')[tdp_column_num].dataset['value']);
                return value2-value1;
            })
            .sort((a,b) => {
                let value1 = Date.parse(a.querySelectorAll('td')[launch_date_column_num].dataset['value']);
                let value2 = Date.parse(b.querySelectorAll('td')[launch_date_column_num].dataset['value']);
                return value2-value1;
            })
            .sort((a,b) => {
                let value1 = parseInt(a.querySelectorAll('td')[turbo_freq_column_num].dataset['value']);
                let value2 = parseInt(b.querySelectorAll('td')[turbo_freq_column_num].dataset['value']);
                return value2-value1;
            })
            .sort((a,b) => {
                let value1 = parseInt(a.querySelectorAll('td')[base_freq_column_num].dataset['value']);
                let value2 = parseInt(b.querySelectorAll('td')[base_freq_column_num].dataset['value']);
                return value2-value1;
            })
            .sort((a,b) => {
                let value1 = parseInt(a.querySelectorAll('td')[total_cores_column_num].dataset['value']);
                let value2 = parseInt(b.querySelectorAll('td')[total_cores_column_num].dataset['value']);
                return value2-value1;
            })
            .sort((a,b) => {
                let value1 = parseInt(a.querySelectorAll('td')[cache_column_num].dataset['value']);
                let value2 = parseInt(b.querySelectorAll('td')[cache_column_num].dataset['value']);
                return value2-value1;
            })
            .map((row) => {
                rows[0].parentElement.appendChild(row);
            });
    }

    load_more() {
        const loadMoreInterval = setInterval(() => {
            let button = document.getElementById('seeall');

            if (button === null) {
                clearInterval(loadMoreInterval);
                return;
            }

            button.click();
        }, 5310);
    }
};

window.___frt.sorter = new window.___frt.Sorter();
window.___frt.sorter.draw_sort_button();
window.___frt.sorter.load_more();
