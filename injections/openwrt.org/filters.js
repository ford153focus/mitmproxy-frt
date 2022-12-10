// noinspection LocalVariableNamingConventionJS,FunctionNamingConventionJS,SpellCheckingInspection

window.__frt = class  {
    static table_head()
    {
        document.querySelector('table.dataplugin_table').insertAdjacentElement('afterbegin', document.createElement('thead'));
        document.querySelector('table.dataplugin_table thead').appendChild(document.querySelector('table.dataplugin_table tbody tr'));
        document.querySelector('table.dataplugin_table thead').appendChild(document.querySelector('table.dataplugin_table tbody tr'));
    }

    static filter()
    {
        let items = document.querySelectorAll('table.dataplugin_table tbody tr');

        for (let item of items)
        {
            if (isNaN(parseInt(item.querySelector('td.cpu_cores')?.innerText.trim()))) item.remove();
            if (isNaN(parseInt(item.querySelector('td.cpu_mhz')?.innerText.trim()))) item.remove();
            if (isNaN(parseInt(item.querySelector('td.ram_mb')?.innerText.trim()))) item.remove();
            if (isNaN(parseInt(item.querySelector('td.ethernet_gbit_ports')?.innerText.trim()))) item.remove();
            if (isNaN(parseInt(item.querySelector('td.usb_ports')?.innerText.trim()))) item.remove();

            // no broadcom
            if (item.querySelector('td.cpu')?.innerText.toLowerCase().includes('broadcom')) item.remove();

            // 3+ gbit ports is required
            if (parseInt(item.querySelector('td.ethernet_gbit_ports')?.innerText.trim()) < 3) item.remove();
        }
    }

    static sort()
    {
        let items = document.querySelectorAll('table.dataplugin_table tbody tr');

        Array.from(items)
            .sort((item1, item2) => {
                let cores1 = parseInt(item1.querySelector('td.cpu_cores')?.innerText.trim());
                let cores2 = parseInt(item2.querySelector('td.cpu_cores')?.innerText.trim());
                if (cores2>cores1) return 1;
                if (cores1>cores2) return -1;

                let freq1 = parseInt(item1.querySelector('td.cpu_mhz')?.innerText.trim());
                let freq2 = parseInt(item2.querySelector('td.cpu_mhz')?.innerText.trim());
                if (freq2>freq1) return 1;
                if (freq1>freq2) return -1;

                let ram1 = parseInt(item1.querySelector('td.ram_mb')?.innerText.trim());
                let ram2 = parseInt(item2.querySelector('td.ram_mb')?.innerText.trim());
                if (ram2>ram1) return 1;
                if (ram1>ram2) return -1;

                let flash1 = parseInt(item1.querySelector('td.flash_mb')?.innerText.trim());
                let flash2 = parseInt(item2.querySelector('td.flash_mb')?.innerText.trim());
                if (flash2>flash1) return 1;
                if (flash1>flash2) return -1;

                let gb_ports1 = parseInt(item1.querySelector('td.ethernet_gbit_ports')?.innerText.trim());
                let gb_ports2 = parseInt(item2.querySelector('td.ethernet_gbit_ports')?.innerText.trim());
                if (gb_ports2>gb_ports1) return 1;
                if (gb_ports1>gb_ports2) return -1;

                return 0;
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    static hide_ripe() {
        document.querySelectorAll('td.fccid').forEach(el => el.style.display='none');
        document.querySelector('table.dataplugin_table tr th:nth-child(6)').style.display='none';
        document.querySelector('table.dataplugin_table tr.dataflt th:nth-child(6)').style.display='none';

        document.querySelectorAll('td.supported_since_commit').forEach(el => el.style.display='none');
        document.querySelector('table.dataplugin_table tr th:nth-child(8)').style.display='none';
        document.querySelector('table.dataplugin_table tr.dataflt th:nth-child(8)').style.display='none';

        document.querySelectorAll('td.bootloader').forEach(el => el.style.display='none');
        document.querySelector('table.dataplugin_table tr th:nth-child(12)').style.display='none';
        document.querySelector('table.dataplugin_table tr.dataflt th:nth-child(12)').style.display='none';
    }
};

console.info('Filtering by user script is in progress');
window.__frt.table_head();
window.__frt.filter();
window.__frt.hide_ripe();
console.info('Filtering complete');
