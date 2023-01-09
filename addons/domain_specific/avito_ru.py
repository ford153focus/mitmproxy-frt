from mitmproxy import http
from utils import Utils

class Avito:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("avito.ru"): return # host end
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("injections/avito.ru/js/adblock.js")},
                    {"path": Utils.local_injector_url("injections/avito.ru/js/ad_hider.js")},
                    {"path": Utils.local_injector_url("injections/avito.ru/js/ad_filter.js")},
                    {"path": Utils.local_injector_url("injections/avito.ru/js/hotkeys.js")},
                    {"path": Utils.local_injector_url("injections/avito.ru/js/autosearch_sort.js")},
                ],
                "styles": [
                    {"path": Utils.local_injector_url("injections/avito.ru/css/styles.css")},
                ],
            }
        )
