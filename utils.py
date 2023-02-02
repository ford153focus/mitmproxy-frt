from bs4 import BeautifulSoup
from mitmproxy import http
from urllib.parse import urlparse
from typing import List
import htmlmin

class Utils:
    def get_host(flow: http.HTTPFlow) -> List[str]:
        host = flow.request.host.split(".")
        host.reverse()
        host += ['']*5
        return host

    def get_path(flow: http.HTTPFlow) -> List[str]:
        path = urlparse(flow.request.pretty_url).path.split('/')
        path.pop(0)
        path += ['']*5
        return path

    def local_injector_url(path: str) -> str:
        return f"https://example.com/___frt/{path}"

    @staticmethod
    async def inject(flow: http.HTTPFlow, targets) -> None:
        soup = BeautifulSoup(flow.response.content, 'lxml')

        if 'styles' in targets:
            for style in targets['styles']:
                tag = soup.new_tag("link")
                tag.attrs["rel"] = "stylesheet"
                tag.attrs["href"] = style['path']
                tag.attrs["crossorigin"] = "anonymous"
                tag.attrs["referrerpolicy"] = "no-referrer"

                if soup.html is not None:
                    if soup.html.select_one('head') is not None:
                        soup.html.head.append(tag)

        if 'scripts' in targets:
            for script in targets['scripts']:
                tag = soup.new_tag("script")

                if 'async' in script and script['async']:
                    tag.attrs["async"] = "async"
                else:
                    tag.attrs["defer"] = "defer"

                tag.attrs["src"] = script['path']
                tag.attrs["crossorigin"] = "anonymous"
                tag.attrs["referrerpolicy"] = "no-referrer"

                if soup.html is not None:
                    if soup.html.select_one('head') is not None:
                        soup.html.head.append(tag)

        flow.response.content = htmlmin.minify(soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')


    @staticmethod
    async def inject_bootstrap(flow: http.HTTPFlow) -> None:
        await Utils.inject(
            flow,
            {
                "scripts": [
                    {"path": "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"},
                ],
                "styles": [
                    {"path": "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"},
                ],
            }
        )

    @staticmethod
    async def inject_font_awesome(flow: http.HTTPFlow) -> None:
        await Utils.inject(
            flow,
            {
                "styles": [
                    {"path": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"},
                ],
            }
        )

    @staticmethod
    def is_html(flow: http.HTTPFlow) -> bool:
        if 'content-type' not in flow.response.headers: return False
        content_type = flow.response.headers.get('content-type')
        return content_type.startswith('text/html')

    @staticmethod
    def nullify_content(self):
        pass
