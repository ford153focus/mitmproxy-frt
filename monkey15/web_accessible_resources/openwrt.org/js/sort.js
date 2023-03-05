if (!window.___frt) window.___frt = {};

window.___frt.Filters = class {
    static three_gbit_ports(){
        for (const row of ___frt.Utils.get_rows()) {
            let ethernet_gbit_ports = parseInt(row.querySelector('td.ethernet_gbit_ports')?.innerText);
            if (ethernet_gbit_ports < 3) row.remove();
        }
    }
    static no_broadcom(){
        for (const row of ___frt.Utils.get_rows()) {
            let cpu = row.querySelector('td.cpu').innerText.toLowerCase();
            let wlan = row.querySelector('td.wlan_hardware').innerText.toLowerCase();

            if (cpu.includes('broadcom')) row.remove();
            if (wlan.includes('broadcom')) row.remove();
        }
    }
};

window.___frt.Sorters = class {
    static is_qualcomm() {
        let rows_array = ___frt.Utils.get_rows();

        rows_array
            .sort((row1, row2) => {
                let cpu1 = row1.querySelector('td.cpu').innerText.toLowerCase();
                let wlan1 = row1.querySelector('td.wlan_hardware').innerText.toLowerCase();

                let cpu2 = row2.querySelector('td.cpu').innerText.toLowerCase();
                let wlan2 = row2.querySelector('td.wlan_hardware').innerText.toLowerCase();

                let isQ1 = cpu1.includes('qualcomm') || wlan1.includes('qualcomm');
                let isQ2 = cpu2.includes('qualcomm') || wlan2.includes('qualcomm');

                if (!isQ1 && isQ2) return 1;
                if (isQ1 && !isQ2) return -1;

                return 0;
            })
            .map((item) => {
                rows_array[0].parentElement.appendChild(item);
            });
    }

    static by_cpu_cores() {
        let rows_array = ___frt.Utils.get_rows();

        rows_array
            .sort((row1, row2) => {
                let value1 = parseFloat(row1.querySelector('td.cpu_cores').innerText);
                let value2 = parseFloat(row2.querySelector('td.cpu_cores').innerText);

                return value2-value1;
            })
            .map((item) => {
                rows_array[0].parentElement.appendChild(item);
            });
    }

    static by_cpu_freq() {
        let rows_array = ___frt.Utils.get_rows();

        rows_array
            .sort((row1, row2) => {
                let value1 = parseInt(row1.querySelector('td.cpu_mhz').innerText);
                let value2 = parseInt(row2.querySelector('td.cpu_mhz').innerText);

                return value2-value1;
            })
            .map((item) => {
                rows_array[0].parentElement.appendChild(item);
            });
    }

    static by_ram() {
        let rows_array = ___frt.Utils.get_rows();

        rows_array
            .sort((row1, row2) => {
                let value1 = parseInt(row1.querySelector('td.ram_mb').innerText);
                let value2 = parseInt(row2.querySelector('td.ram_mb').innerText);

                return value2-value1;
            })
            .map((item) => {
                rows_array[0].parentElement.appendChild(item);
            });
    }

    static by_flash() {
        let rows_array = ___frt.Utils.get_rows();

        rows_array
            .sort((row1, row2) => {
                let value1 = parseInt(row1.querySelector('td.flash_mb').innerText);
                let value2 = parseInt(row2.querySelector('td.flash_mb').innerText);

                return value2-value1;
            })
            .map((item) => {
                rows_array[0].parentElement.appendChild(item);
            });
    }
}

window.___frt.Utils = class {
    static get_rows(){
        let rows = document.querySelectorAll("table.dataplugin_table tr");
        let rows_array = Array.from(rows);
        rows_array.shift();
        rows_array.shift();
        return rows_array;
    }
}

for (const el of document.querySelectorAll("table.dataplugin_table tr")) {
    el.childNodes[0].style.display = 'none';
    el.childNodes[4].style.display = 'none';
    el.childNodes[5].style.display = 'none';
    el.childNodes[6].style.display = 'none';
}
