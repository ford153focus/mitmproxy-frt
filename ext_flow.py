from bs4 import BeautifulSoup
from mitmproxy import http


class ExtFlow:
    origin: http.HTTPFlow = None
    content_type: str = None
    soup: BeautifulSoup = None

    @staticmethod
    def empty_answer(flow) -> None:
        flow.response = http.Response.make(
            403,  # (optional) status code
            b"",  # (optional) content
            {"Content-Type": "text/plain; charset=utf-8"},  # (optional) headers
        )

    def commit_changes(self) -> None:
        self.origin.response.content = self.soup.prettify().encode('UTF-8')

    def inject_hypertext(self, path) -> None:
        content = open(path, encoding="utf8", mode="r").read()
        parsed = BeautifulSoup(content, 'html.parser')
        self.soup.html.body.append(parsed)

    def inject_script(self, path, local=True, defer=True, asynchronous=False) -> None:
        tag = self.soup.new_tag("script")

        if asynchronous: tag.attrs["async"] = "async"
        if defer: tag.attrs["defer"] = "defer"
        if local: path = f"https://example.com/___frt/{path}"

        tag.attrs["src"] = path
        tag.attrs["crossorigin"] = "anonymous"
        tag.attrs["referrerpolicy"] = "no-referrer"

        self.soup.html.head.append(tag)

    def inject_stylesheet(self, path, local=True) -> None:
        if local: path = f"https://example.com/___frt/{path}"

        tag = self.soup.new_tag("link")
        tag.attrs["rel"] = "stylesheet"
        tag.attrs["href"] = path
        tag.attrs["crossorigin"] = "anonymous"
        tag.attrs["referrerpolicy"] = "no-referrer"
        self.soup.html.head.append(tag)

    def inject_bootstrap(self) -> None:
        self.inject_stylesheet("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css", False)
        self.inject_script("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js", False)

    def inject_font_awesome(self) -> None:
        self.inject_stylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css", False)

    def is_html(self) -> bool:
        return self.content_type.startswith('text/html')

    def __init__(self, flow: http.HTTPFlow):
        self.origin = flow

        content_type = flow.response.headers.get('content-type')
        self.content_type = str(content_type)

        if self.is_html():
            self.soup = BeautifulSoup(flow.response.content, 'lxml')
            self.inject_script("injections/_all_urls/js/utils.js", defer=False, asynchronous=True)
