import os
from mitmproxy import http
from utils import Utils

class ExampleCom:
    async def request(self, flow: http.HTTPFlow) -> None:
        if flow.request.host != 'example.com': return # strict host
        if not flow.request.path.startswith("/___frt/"): return

        file_path = flow.request.path.replace("/___frt/", "./")
        if os.path.isfile(file_path) == False: return
        file_content = open(file_path, encoding="utf8").read()

        content_type = "text/plain; charset=utf-8"
        if file_path.endswith(".css"):  content_type = "text/css; charset=utf-8"
        if file_path.endswith(".js"):   content_type = "application/javascript; charset=utf-8"
        if file_path.endswith(".json"): content_type = "application/json; charset=utf-8"
        if file_path.endswith(".html"): content_type = "text/html; charset=utf-8"

        flow.response = http.Response.make(
            200,  # (optional) status code
            file_content.encode(),  # (optional) content
            {
                "Content-Type": content_type,
                "Access-Control-Allow-Origin": "*",
                "cross-origin-resource-policy": "cross-origin",
            },  # (optional) headers
        )
