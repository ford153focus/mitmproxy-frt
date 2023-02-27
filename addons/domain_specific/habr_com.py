import fnmatch
from mitmproxy import http
from utils import Utils

class Habr:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("habr.com"): return # host end

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

        if flow.request.host.endswith("habr.com"):
            if flow.request.path.endswith("/favorites/") or flow.request.path.endswith("/favorites/posts/"):
                await Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("habr.com/js/fav_table.js")},
                        ],
                        "styles": [
                            {"path": Utils.local_injector_url("habr.com/css/fav_table.css")},
                        ],
                        "html": [
                            {"path": Utils.local_injector_url("habr.com/html/fav_table.html")},
                        ]
                    }
                )

            if fnmatch.fnmatch(flow.request.path, "/*/post/*/") or fnmatch.fnmatch(flow.request.path, "/*/blog/*/"):
                await Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("habr.com/js/no_comments.js")},
                        ],
                    }
                )
