from mitmproxy import http
from utils import Utils
from bs4 import BeautifulSoup

class Wikia:
    async def response(self, flow: http.HTTPFlow) -> None:
        if not flow.request.host.endswith("wikia.com"): return # host end
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        soup = BeautifulSoup(flow.response.content, 'lxml')

        for el in soup.select("#INCONTENT_WRAPPER"): el.decompose()
        for el in soup.select("#WikiaFooter"): el.decompose()
        for el in soup.select("#WikiaRailWrapper"): el.decompose()
        for el in soup.select("div[id^='google_ads_iframe_']"): el.decompose()

        flow.response.content = soup.prettify().encode(encoding='utf-8')
