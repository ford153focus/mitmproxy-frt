from mitmproxy import http
from utils import Utils

class Pyatyorochka:
    async def response(self, flow: http.HTTPFlow) -> None:
        if flow.request.pretty_url != 'https://5ka.ru/special_offers/': return # strict url
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("injections/5ka.ru/js/sort.js")},
                ],
            }
        )
