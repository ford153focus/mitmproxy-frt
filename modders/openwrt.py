import multiprocessing
import bs4

from ext_flow import ExtFlow


class OpenWRT:
    @staticmethod
    def hide_ripe(row: bs4.Tag) -> None:
        for num in [5, 7, 11]:
            for cell in row.find_all("th")[num]: cell.decompose()
            for cell in row.find_all("td")[num]: cell.decompose()

    @staticmethod
    def filter(ext_flow: ExtFlow) -> None:
        rows = ext_flow.soup.select("table.dataplugin_table tr")
        rows.pop() and rows.pop()
        for row in rows:
            if not row.find('td', {'class': 'cpu_cores'}).text.isdigit(): row.decompose()  # delete devices with unknown cpu cores amount
            if not row.find('td', {'class': 'cpu_mhz'}).text.isdigit(): row.decompose()  # delete devices with unknown cpu freq
            if not row.find('td', {'class': 'ram_mb'}).text.isdigit(): row.decompose()  # delete devices with unknown ram size
            if not row.find('td', {'class': 'ethernet_gbit_ports'}).text.isdigit(): row.decompose()  # delete devices with unknown gbit ports amount
            if not row.find('td', {'class': 'usb_ports'}).text.isdigit(): row.decompose()  # delete devices with unknown usb ports amount

            if row.find('td', {'class': 'cpu'}).text.lower().find('broadcom') > -1: row.decompose()  # no broadcom
            if int(row.find('td', {'class': 'ethernet_gbit_ports'}).text) < 3: row.decompose()  # 3+ gbit ports is required

    @staticmethod
    def response(ext_flow: ExtFlow) -> None:
        rows = ext_flow.soup.select("table.dataplugin_table tr")
        pool = multiprocessing.Pool(16)

        out1, out2, out3 = zip(*pool.map(OpenWRT.hide_ripe, rows))
        # OpenWRT.hide_ripe(ext_flow)
        # OpenWRT.filter(ext_flow)
