let rows = Array.from(document.querySelectorAll("table.dataplugin_table tr"))
rows
    .sort((row1, row2) => {
        return parseInt(row2.querySelector('td.flash_mb')?.innerText) - parseInt(row1.querySelector('td.flash_mb')?.innerText);
    })
     .sort((row1, row2) => {
        return parseInt(row2.querySelector('td.cpu_mhz')?.innerText) - parseInt(row1.querySelector('td.cpu_mhz')?.innerText);
    })
     .sort((row1, row2) => {
        return parseInt(row2.querySelector('td.cpu_cores')?.innerText) - parseInt(row1.querySelector('td.cpu_cores')?.innerText);
    })
     .sort((row1, row2) => {
        return parseInt(row2.querySelector('td.ram_mb')?.innerText) - parseInt(row1.querySelector('td.ram_mb')?.innerText);
    })
    .map((item) => {
        rows[0].parentElement.appendChild(item);
    });
