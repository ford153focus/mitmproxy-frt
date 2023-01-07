from mitmproxy import http
from bs4 import BeautifulSoup
from urllib.parse import urlparse

from utils import Utils


class DailyDigitalDigest:
    @staticmethod
    def response(flow: http.HTTPFlow) -> None:
        DailyDigitalDigest.ad_block(flow)
        DailyDigitalDigest.no_comment(flow)

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

        flow.response.content = soup.prettify().encode('UTF-8')

    @staticmethod
    def no_comment(flow: http.HTTPFlow) -> None:
        if Utils.is_html(flow) is False: return
        soup = BeautifulSoup(flow.response.content, 'lxml')

        if soup.find(id="mc-container") is not None: soup.find(id="mc-container").decompose()
        for block in soup.select('.commentlinkblock'): block.decompose()
        for block in soup.select('.comment-warn'): block.decompose()

        flow.response.content = soup.prettify().encode('UTF-8')
