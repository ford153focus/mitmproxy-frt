from concurrent.futures import ThreadPoolExecutor
import bs4

from ext_flow import ExtFlow


class OpenWRT:
    @staticmethod
    def hide_ripe(row: bs4.Tag) -> None:
        targets = []

        targets.append(row.select_one(f"td:nth-child(6)"))
        targets.append(row.select_one(f"th:nth-child(6)"))

        targets.append(row.select_one(f"td:nth-child(8)"))
        targets.append(row.select_one(f"th:nth-child(8)"))

        targets.append(row.select_one(f"td:nth-child(12)"))
        targets.append(row.select_one(f"th:nth-child(12)"))

        for target in targets:
            if target is None: continue
            target.decompose()

    @staticmethod
    def filter(row: bs4.Tag) -> None:
        # delete devices with unknown cpu cores amount
        target = row.find('td', {'class': 'cpu_cores'})
        if target is not None:
            if not target.text.isdigit():
                row.decompose()

        # delete devices with unknown cpu freq
        target = row.find('td', {'class': 'cpu_mhz'})
        if target is not None:
            if not target.text.isdigit():
                row.decompose()

        # delete devices with unknown ram size
        target = row.find('td', {'class': 'ram_mb'})
        if target is not None:
            if not target.text.isdigit():
                row.decompose()

        # delete devices with unknown gbit ports amount
        # 3+ gbit ports is required
        target = row.find('td', {'class': 'ethernet_gbit_ports'})
        if target is not None:
            if not target.text.isdigit():
                row.decompose()
            elif int(target.text) < 3:
                row.decompose()

        # delete devices with unknown usb ports amount
        target = row.find('td', {'class': 'usb_ports'})
        if target is not None:
            if target.text.strip() == "":
                row.decompose()

        # no broadcom
        target = row.find('td', {'class': 'cpu'})
        if target is not None:
            if target.text.lower().find('broadcom') > -1:
                row.decompose()

    @staticmethod
    def response(ext_flow: ExtFlow) -> None:
        rows = ext_flow.soup.select("table.dataplugin_table tr")

        with ThreadPoolExecutor() as executor:
            executor.map(OpenWRT.filter, rows, timeout=30)
            executor.map(OpenWRT.hide_ripe, rows, timeout=30)
