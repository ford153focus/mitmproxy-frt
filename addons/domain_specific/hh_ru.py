from mitmproxy import http
from utils import Utils

class HeadHunter:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("hh.ru"): return # host end

        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        if flow.request.path == "/applicant/resumes/edit/experience":
            await Utils.inject(
                flow,
                {
                    "scripts": [
                        {"path": Utils.local_injector_url("hh.ru/js/fix_height.js")},
                    ],
                }
            )
