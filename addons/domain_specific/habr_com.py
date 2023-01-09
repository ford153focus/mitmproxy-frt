import fnmatch
from mitmproxy import http
from utils import Utils

class Habr:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("habr.com"): return # host end
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("injections/example.com/js/script.js")},
                ],
                "styles": [
                    {"path": Utils.local_injector_url("injections/example.com/css/style.css")},
                ],
            }
        )

        if flow.request.host.endswith("habr.com"):
            if flow.request.path.endswith("/favorites/") or flow.request.path.endswith("/favorites/posts/"):
                Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/habr.com/js/fav_table.js")},
                        ],
                        "styles": [
                            {"path": Utils.local_injector_url("injections/habr.com/css/fav_table.css")},
                        ],
                        "html": [
                            {"path": Utils.local_injector_url("injections/habr.com/html/fav_table.html")},
                        ]
                    }
                )
            
            if fnmatch.fnmatch(flow.request.path, "/*/post/*/") or fnmatch.fnmatch(flow.request.path, "/*/blog/*/"):
                Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/habr.com/js/no_comments.js")},
                        ],
                    }
                )
