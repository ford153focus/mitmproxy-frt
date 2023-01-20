from mitmproxy import http
from utils import Utils

class Pepper:
    async def response(self, flow: http.HTTPFlow) -> None:
        if Utils.get_host(flow)[0:2] != ['ru', 'pepper']: return # 2nd lvl domain
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("injections/pepper.ru/script.js")},
                ],
                "styles": [
                    {"path": Utils.local_injector_url("injections/pepper.ru/style.css")},
                ],
            }
        )
