from mitmproxy import http
from utils import Utils

class Auchan:
    async def response(self, flow: http.HTTPFlow) -> None:
        if Utils.get_host(flow)[0:1] != ['ru', 'auchan']: return # 2nd lvl domain
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        if flow.request.path.startswith("/catalog/") or flow.request.path.startswith("/superceny/") or flow.request.path.startswith("/cashback/"):
            Utils.inject(
                flow,
                {
                    "scripts": [
                        {"path": Utils.local_injector_url("injections/auchan.ru/js/pager_clicker.js")},
                        {"path": Utils.local_injector_url("injections/auchan.ru/js/filters_bar_injector.js")},
                        {"path": Utils.local_injector_url("injections/auchan.ru/js/sorter.js")},
                    ],
                    "styles": [
                        {"path": Utils.local_injector_url("injections/auchan.ru/css/styles.css")},
                    ],
                }
            )
        
        if flow.request.path == "/cart/":
            Utils.inject(
                flow,
                {
                    "scripts": [
                        {"path": Utils.local_injector_url("injections/auchan.ru/js/cart_printer.js")},
                    ],
                }
            )
