let rows = document.querySelectorAll('#product-table tbody tr').frtToArray();

rows
    .sort((a,b) => {
        let q1 = a.querySelector('td:nth-child(3)').innerText.split('\'')[0].replace(/\D/, '');
        let q2 = b.querySelector('td:nth-child(3)').innerText.split('\'')[0].replace(/\D/, '');
        return q1-q2;
    })
    .sort((a,b) => {
        let year1 = a.querySelector('td:nth-child(3)').innerText.split('\'')[1];
        let year2 = b.querySelector('td:nth-child(3)').innerText.split('\'')[1];
        return year1-year2;
    })
    .sort((a,b) => {
        let cache1 = parseFloat(a.querySelector('td:nth-child(7)').innerText);
        let cache2 = parseFloat(b.querySelector('td:nth-child(7)').innerText);
        return cache1-cache2;
    })
    .sort((a,b) => {
        let turbo_freq_1 = a.querySelector('td:nth-child(5)').innerText.includes(',') ? parseFloat(a.querySelector('td:nth-child(5)').innerText.replace(',','.'))*1000 : parseInt(a.querySelector('td:nth-child(5)').innerText);
        let turbo_freq_2 = b.querySelector('td:nth-child(5)').innerText.includes(',') ? parseFloat(b.querySelector('td:nth-child(5)').innerText.replace(',','.'))*1000 : parseInt(b.querySelector('td:nth-child(5)').innerText);
        return turbo_freq_1-turbo_freq_2;
    })
    .sort((a,b) => {
        let base_freq_1 = a.querySelector('td:nth-child(6)').innerText.includes(',') ? parseFloat(a.querySelector('td:nth-child(6)').innerText.replace(',','.'))*1000 : parseInt(a.querySelector('td:nth-child(6)').innerText);
        let base_freq_2 = b.querySelector('td:nth-child(6)').innerText.includes(',') ? parseFloat(b.querySelector('td:nth-child(6)').innerText.replace(',','.'))*1000 : parseInt(b.querySelector('td:nth-child(6)').innerText);
        return base_freq_1-base_freq_2;
    })
    .sort((a,b) => {
        let cores1 = a.querySelector('td:nth-child(4)').innerText;
        let cores2 = b.querySelector('td:nth-child(4)').innerText;
        return cores1-cores2;
    })
    .map((row) => {
        rows[0].parentElement.appendChild(row);
    });
