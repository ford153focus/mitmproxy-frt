from mitmproxy import http
from utils import Utils

class Addon:
    async def request(self, flow: http.HTTPFlow) -> None:
        if flow.request.host != 'example.com': return # strict host
        if flow.request.pretty_url != 'https://example.com/hello/': return # strict url
        if not flow.request.pretty_url.startswith('https://example.com/hello/'): return # url start
        if not flow.request.host.endswith("example.com"): return # host end
        if Utils.get_host(flow)[0:2] != ['com', 'example']: return # 2nd lvl domain

        pass

    async def response(self, flow: http.HTTPFlow) -> None:
        if flow.request.host != 'example.com': return # strict host
        if flow.request.pretty_url != 'https://example.com/hello/': return # strict url
        if not flow.request.pretty_url.startswith('https://example.com/hello/'): return # url start
        if not flow.request.host.endswith("example.com"): return # host end
        if Utils.get_host(flow)[0:2] != ['com', 'example']: return # 2nd lvl domain

        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        await Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("example.com/js/script.js")},
                ],
                "styles": [
                    {"path": Utils.local_injector_url("example.com/css/style.css")},
                ],
            }
        )
