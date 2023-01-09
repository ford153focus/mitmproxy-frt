from mitmproxy import http
from utils import Utils
from bs4 import BeautifulSoup

class HoneyHunterWorld:
    async def response(self, flow: http.HTTPFlow) -> None:
        if Utils.get_host(flow)[1] != "honeyhunterworld": return # 2nd lvl domain
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        if flow.request.host == "genshin.honeyhunterworld.com":
            soup = BeautifulSoup(flow.response.content, 'lxml')
            soup.find('div', {'id': 'genshin-video-player'}).decompose()
            flow.response.content = soup.prettify().encode(encoding='utf-8')
