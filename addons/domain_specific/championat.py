from mitmproxy import http
from utils import Utils

class Championat:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("championat.com"): return # host end
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("injections/championat.com/js/adblock.js")},
                    {"path": Utils.local_injector_url("injections/championat.com/js/no_partners.js")},
                ],
            }
        )

        if flow.request.path.find("/article-") > -1 or flow.request.path.find("/news-") > -1:
            Utils.inject(
                flow,
                {
                    "scripts": [
                        {"path": Utils.local_injector_url("injections/championat.com/js/comments_switcher.js")},
                    ],
                    "styles": [
                        {"path": Utils.local_injector_url("injections/championat.com/css/comments_switcher.css")},
                    ],
                }
            )
