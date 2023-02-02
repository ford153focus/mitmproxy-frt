from urllib.parse import urlparse
from mitmproxy import http
from utils import Utils
from bs4 import BeautifulSoup
import htmlmin

class DailyDigitalDigest:
    @staticmethod
    def ad_block(flow: http.HTTPFlow) -> None:
        if Utils.is_html(flow) is False: return
        soup = BeautifulSoup(flow.response.content, 'lxml')

        if soup.find(id="left-sidebar") is not None: soup.find(id="left-sidebar").clear()
        if soup.find(id="right-sidebar") is not None: soup.find(id="right-sidebar").clear()
        if soup.find(id="most-commented") is not None: soup.find(id="most-commented").clear()
        if soup.find(id="yandex-widget-offers") is not None: soup.find(id="yandex-widget-offers").decompose()

        for script in soup.findAll('script'):
            if "src" in script.attrs:
                hostname: str = urlparse(script.attrs['src']).hostname
                if hostname.endswith('ya.ru'): script.decompose()
                if hostname.endswith('yandex.ru'): script.decompose()
            else:
                if "yandex.ru" in script.decode_contents(): script.decompose()
                if "ya.ru" in script.decode_contents(): script.decompose()

        for ad in soup.select('.nomargins.ad'): ad.clear()

        flow.response.content = htmlmin.minify(soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')

    @staticmethod
    def no_comment(flow: http.HTTPFlow) -> None:
        if Utils.is_html(flow) is False: return
        soup = BeautifulSoup(flow.response.content, 'lxml')

        if soup.find(id="mc-container") is not None: soup.find(id="mc-container").decompose()
        for block in soup.select('.commentlinkblock'): block.decompose()
        for block in soup.select('.comment-warn'): block.decompose()

        flow.response.content = htmlmin.minify(soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')


    async def response(self, flow: http.HTTPFlow) -> None:
        if flow.request.host != '3dnews.ru': return # strict host
        
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses
        if not Utils.is_html(flow): return # proccess html only

        await Utils.inject(
			flow,
			{
                "scripts": [
                    {"path": Utils.local_injector_url("injections/3dnews.ru/js/adblock.js")},
                    {"path": Utils.local_injector_url("injections/3dnews.ru/js/no_comments.js")},
                ],
            }
        )
