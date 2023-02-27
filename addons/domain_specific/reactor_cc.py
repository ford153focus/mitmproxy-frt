from mitmproxy import http
from utils import Utils

class Reactor:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("reactor.cc"): return # host end

        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        Utils.inject_font_awesome(flow)

        await Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("joyreactor.cc/js/comment_text_tools.js")},
                    {"path": Utils.local_injector_url("joyreactor.cc/js/play_shortcut.js")},
                    {"path": Utils.local_injector_url("joyreactor.cc/js/rate4comments.js")},
                    {"path": Utils.local_injector_url("joyreactor.cc/js/script.js")},
                    {"path": Utils.local_injector_url("joyreactor.cc/js/unhide_comments.js")},
                ],
                "styles": [
                    {"path": Utils.local_injector_url("joyreactor.cc/css/comment_text_tools.css")},
                    {"path": Utils.local_injector_url("joyreactor.cc/css/rate4comments.css")},
                ],
            }
        )
