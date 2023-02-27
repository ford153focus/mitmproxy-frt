from mitmproxy import http
from utils import Utils

class AutoRu:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("auto.ru"): return # host end

        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        await Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("auto.ru/js/adblock.js")},
                ],
            }
        )
