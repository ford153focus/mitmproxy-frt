from bs4 import BeautifulSoup
from mitmproxy import http


class ExtFlow:
    origin: http.HTTPFlow = None
    content_type: str = None
    soup: BeautifulSoup = None

    def commit_changes(self) -> None:
        self.origin.response.content = self.soup.prettify().encode('UTF-8')

    def inject_script(self, path, local=True) -> None:
        script_tag = self.soup.new_tag("script")
        script_tag.attrs["defer"] = "defer"
        if local: path = f"https://example.com/___frt/{path}"
        script_tag.attrs["src"] = path
        self.soup.html.head.append(script_tag)

    def inject_stylesheet(self, path, local=True) -> None:
        script_tag = self.soup.new_tag("link")
        script_tag.attrs["rel"] = "stylesheet"
        if local: path = f"https://example.com/___frt/{path}"
        script_tag.attrs["src"] = path
        self.soup.html.head.append(script_tag)

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
            self.inject_script("injections/___all_urls/js/utils.js")
