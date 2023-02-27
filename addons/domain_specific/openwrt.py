from mitmproxy import http
from concurrent.futures import ThreadPoolExecutor
import bs4
import htmlmin

from utils import Utils

class OpenWRT:
    @staticmethod
    def hide_ripe(row: bs4.Tag) -> None:
        cell_nums = [6, 8, 12, 14, 15, 21]

        targets = []

        for num in cell_nums:
            targets.append(row.select_one(f"td:nth-child({num})"))
            targets.append(row.select_one(f"th:nth-child({num})"))

        for target in targets:
            if target is not None:
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
        # 4+ gbit ports is required
        target = row.find('td', {'class': 'ethernet_gbit_ports'})
        if target is not None:
            if not target.text.isdigit():
                row.decompose()
            elif int(target.text) < 4:
                row.decompose()

        # delete devices with unknown usb ports amount
        # target = row.find('td', {'class': 'usb_ports'})
        # if target is not None:
        #     if target.text.strip() == "-":
        #         row.decompose()

        # no broadcom
        target = row.find('td', {'class': 'cpu'})
        if target is not None:
            if target.text.lower().find('broadcom') > -1:
                row.decompose()

        # Wi-Fi routers only
        target = row.find('td', {'class': 'device_type'})
        if target is not None:
            text = target.text.lower().strip()
            if text.find('wifi') == -1 or text.find('router') == -1:
                row.decompose()

    async def response(self, flow: http.HTTPFlow) -> None:
        if flow.request.pretty_url != 'https://openwrt.org/toh/views/toh_extended_all': return # strict url

        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        soup = bs4.BeautifulSoup(flow.response.content, 'lxml')
        rows = soup.select("table.dataplugin_table tr")

        with ThreadPoolExecutor() as executor:
            executor.map(OpenWRT.filter, rows, timeout=30)
            executor.map(OpenWRT.hide_ripe, rows, timeout=30)

        flow.response.content = htmlmin.minify(soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')

        await Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("openwrt.org/js/sort.js")},
                ],
            }
        )
