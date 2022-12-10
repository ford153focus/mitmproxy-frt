from mitmproxy import http


class Utils:
    @staticmethod
    def is_html(flow: http.HTTPFlow) -> bool:
        content_type = flow.response.headers.get('content-type')
        content_type = str(content_type)
        return content_type.startswith('text/html')

    @staticmethod
    def nullify_content(self):
        pass
