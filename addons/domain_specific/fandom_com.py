from mitmproxy import http
from utils import Utils

class Fandom:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("fandom.com"): return # host end
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        if flow.request.host.startswith("genshin-impact"):
            if flow.request.path == "/wiki/Event":
                Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/fandom.com/genshin-impact/event_list.js")},
                        ],
                    }
                )
            if flow.request.path == "/wiki/World_Quest/List":
                Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/fandom.com/genshin-impact/quest_list.js")},
                        ],
                    }
                )
            if flow.request.path == "/wiki/Hidden_Exploration_Objective":
                Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/fandom.com/genshin-impact/hidden_exploration_objective.js")},
                        ],
                    }
                )
