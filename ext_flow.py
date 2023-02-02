from typing import List
from bs4 import BeautifulSoup
from mitmproxy import http
from urllib.parse import urlparse
import htmlmin

class ExtFlow:
    origin: http.HTTPFlow = None
    _content_type: str = None
    _soup: BeautifulSoup = None
    _host: List[str] = None
    _path: List[str] = None

    @staticmethod
    def empty_answer(flow: http.HTTPFlow) -> None:
        flow.response = http.Response.make(
            204,  # (optional) status code
            "",  # (optional) content
            {"Content-Type": "text/plain; charset=utf-8"},  # (optional) headers
        )

    def commit_changes(self) -> None:
        self.origin.response.content = htmlmin.minify(self.soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')

    def inject_hypertext(self, path) -> None:
        content = open(path, encoding="utf8", mode="r").read()
        parsed = BeautifulSoup(content, 'lxml')
        self.soup.html.body.append(parsed)

    def inject_script(self, path, local=True, defer=True, asynchronous=False) -> None:
        tag = self.soup.new_tag("script")

        if asynchronous: tag.attrs["async"] = "async"
        if defer: tag.attrs["defer"] = "defer"
        if local: path = f"https://example.com/___frt/{path}"

        tag.attrs["src"] = path
        tag.attrs["crossorigin"] = "anonymous"
        tag.attrs["referrerpolicy"] = "no-referrer"

        if self.soup.html.head is not None:
            self.soup.html.head.append(tag)

    def inject_stylesheet(self, path, local=True) -> None:
        if local: path = f"https://example.com/___frt/{path}"

        tag = self.soup.new_tag("link")
        tag.attrs["rel"] = "stylesheet"
        tag.attrs["href"] = path
        tag.attrs["crossorigin"] = "anonymous"
        tag.attrs["referrerpolicy"] = "no-referrer"

        if self.soup.html.head is not None:
            self.soup.html.head.append(tag)

    def inject_bootstrap(self) -> None:
        self.inject_stylesheet("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css", False)
        self.inject_script("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js", False)

    def inject_font_awesome(self) -> None:
        self.inject_stylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css", False)

    def is_html(self) -> bool:
        return self.content_type.startswith('text/html')

    def allow_example_com_assets(self):
        scp_header = self.origin.response.headers['content-security-policy']
        scp_policies = scp_header.split(";")
        for i in range(0, len(scp_policies)-1):
            if '-src ' in scp_policies[i]:
                scp_policies[i] += " example.com"
        new_header_content = ";".join(scp_policies)
        self.origin.response.headers['content-security-policy'] = new_header_content

    @property
    def host(self) -> List[str]:
        if self._host is None:
            self._host = self.origin.request.host.split(".")
            self._host.reverse()
            self._host += ['']*5
        return self._host
    
    @property
    def path(self) -> List[str]:
        if self._path is None:
            self._path = urlparse(self.origin.request.pretty_url).path.split('/')
            self._path.pop(0)
            self._path += ['']*5
        return self._path
    
    @property
    def soup(self) -> BeautifulSoup:
        if self._soup is None:
            if self.is_html():
                self._soup = BeautifulSoup(self.origin.response.content, 'lxml')
                self.inject_script("injections/_all_urls/js/utils.js", defer=False, asynchronous=False)
        return self._soup
    
    @property
    def content_type(self) -> str:
        if self._content_type is None:
            content_type = self.origin.response.headers.get('content-type')
            self._content_type = str(content_type)
        return self._content_type

    def __init__(self, flow: http.HTTPFlow):
        self.origin = flow

        if 'content-security-policy' in flow.response.headers:
            del flow.response.headers['content-security-policy']
