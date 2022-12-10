from mitmproxy import http

from ext_flow import ExtFlow
from modders.openwrt import OpenWRT


class Starter:
    black_list_hosts = []
    ext_flow: ExtFlow = None

    def __init__(self):
        for line in open('hosts.txt').read().split('\n'):
            if not line.startswith('0.0.0.0 '): continue
            rule = line.split(' ')
            self.black_list_hosts.append(rule[1])

    def request(self, flow: http.HTTPFlow) -> None:
        if flow.request.host == 'example.com':
            if flow.request.path.startswith("/___frt/"):
                file_path = flow.request.path.replace("/___frt/", "./")
                file_content = open(file_path, encoding="utf8").read()

                content_type = "text/plain; charset=utf-8"
                if file_path.endswith(".css"):  content_type = "text/css; charset=utf-8"
                if file_path.endswith(".js"):   content_type = "application/javascript; charset=utf-8"
                if file_path.endswith(".json"): content_type = "application/json; charset=utf-8"
                if file_path.endswith(".html"): content_type = "text/html; charset=utf-8"

                flow.response = http.Response.make(
                    200,  # (optional) status code
                    file_content.encode(),  # (optional) content
                    {"Content-Type": content_type},  # (optional) headers
                )

        if flow.request.host in self.black_list_hosts:
            flow.response = http.Response.make(
                200,  # (optional) status code
                b"",  # (optional) content
                {"Content-Type": "text/plain; charset=utf-8"},  # (optional) headers
            )

    def response(self, flow: http.HTTPFlow) -> None:
        if flow.response.status_code != 200: return  # process HTTP 200 only
        if len(flow.response.content) == 0: return  # skip empty responses

        self.ext_flow = ExtFlow(flow)

        if flow.request.host == '3dnews.ru':
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/3dnews.ru/js/adblock.js")
                self.ext_flow.inject_script("injections/3dnews.ru/js/no_comments.js")
                self.ext_flow.commit_changes()

        if flow.request.pretty_url == 'https://5ka.ru/special_offers/':
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/5ka.ru/js/sort.js")
                self.ext_flow.commit_changes()

        if flow.request.pretty_url.startswith('https://9gag.com/gag/'):
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/9gag.com/js/resize_answer_field.js")
                self.ext_flow.commit_changes()

        if flow.request.host.endswith("auchan.ru"):
            if self.ext_flow.is_html():
                if flow.request.path.startswith("/catalog/") or flow.request.path.startswith("/superceny/"):
                    self.ext_flow.inject_script("injections/auchan.ru/js/pager_clicker.js")
                    self.ext_flow.inject_script("injections/auchan.ru/js/filters_bar_injector.js")
                    self.ext_flow.inject_script("injections/auchan.ru/js/sorter.js")
                    self.ext_flow.inject_stylesheet("injections/auchan.ru/css/styles.css")
                if flow.request.path == "/cart/":
                    self.ext_flow.inject_script("injections/auchan.ru/js/cart_printer.js")
                pass

        if flow.request.host.endswith("auto.ru"):
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/auto.ru/js/adblock.js")
                self.ext_flow.commit_changes()

        if flow.request.host.endswith("avito.ru"):
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/avito.ru/js/adblock.js")
                self.ext_flow.inject_script("injections/avito.ru/js/ad_hider.js")
                self.ext_flow.inject_script("injections/avito.ru/js/ad_filter.js")
                self.ext_flow.inject_script("injections/avito.ru/js/hotkeys.js")
                self.ext_flow.inject_script("injections/avito.ru/js/autosearch_sort.js")
                self.ext_flow.inject_stylesheet("injections/avito.ru/css/styles.css")
                self.ext_flow.commit_changes()

        if flow.request.host.endswith("championat.com"):
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/championat.com/js/adblock.js")
                self.ext_flow.inject_script("injections/championat.com/js/no_partners.js")
                if flow.request.path.find("/article-") > -1 or flow.request.path.find("/news-") > -1:
                    self.ext_flow.inject_script("injections/championat.com/js/comments_switcher.js")
                    self.ext_flow.inject_stylesheet("injections/championat.com/css/comments_switcher.css")
                self.ext_flow.commit_changes()

        if flow.request.host.endswith("cian.ru"):
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/cian.ru/js/ban_nationalism.js")
                self.ext_flow.commit_changes()

        if flow.request.pretty_url == 'https://dixy.ru/catalog/':
            if self.ext_flow.is_html():
                self.ext_flow.inject_script("injections/dixy.ru/js/catalog.js")
                self.ext_flow.commit_changes()

        if flow.request.pretty_url == 'https://openwrt.org/toh/views/toh_extended_all':
            if self.ext_flow.is_html():
                OpenWRT.response(self.ext_flow)
                self.ext_flow.commit_changes()
