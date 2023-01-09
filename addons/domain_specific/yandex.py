from mitmproxy import http
from utils import Utils

class Yandex:
    async def response(self, flow: http.HTTPFlow) -> None:
        if Utils.get_host(flow)[1] != "yandex": return # 2nd lvl domain
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        if Utils.get_host(flow)[2] == "market":
            if Utils.get_path()[0].startswith('product--karta-pamiati-') or Utils.get_path()[0].startswith('product--tverdotelnyi-nakopitel-'):
                Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/market.yandex.ru/js/price_per_gb.js")},
                        ],
                    }
                )