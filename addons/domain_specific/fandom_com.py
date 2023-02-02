import bs4
from mitmproxy import http
import htmlmin
from utils import Utils

class Fandom:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("fandom.com"): return # host end
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        soup = bs4.BeautifulSoup(flow.response.content, 'lxml')
        container = soup.select_one(".top-ads-container")
        container.decompose()
        flow.response.content = htmlmin.minify(soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')

        if flow.request.host.startswith("genshin-impact"):
            if flow.request.path == "/wiki/Event":
                await Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/fandom.com/genshin-impact/event_list.js")},
                        ],
                    }
                )
            if flow.request.path == "/wiki/World_Quest/List":
                await Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/fandom.com/genshin-impact/quest_list.js")},
                        ],
                    }
                )
            if flow.request.path == "/wiki/Hidden_Exploration_Objective":
                await Utils.inject(
                    flow,
                    {
                        "scripts": [
                            {"path": Utils.local_injector_url("injections/fandom.com/genshin-impact/hidden_exploration_objective.js")},
                        ],
                    }
                )
