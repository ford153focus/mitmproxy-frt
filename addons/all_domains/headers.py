from mitmproxy import http
from utils import Utils
from bs4 import BeautifulSoup
import htmlmin

class HeadersAddon:
   def response(self, flow: http.HTTPFlow) -> None:
       if flow.response.status_code != 200: return  # process HTTP 200 only
       if len(flow.response.content) == 0: return  # skip empty responses
#        
#        # if Utils.get_host(flow)[1] == 'vk': return # 2nd lvl domain
#
#        if "Access-Control-Allow-Origin" in flow.response.headers: del flow.response.headers["Access-Control-Allow-Origin"]
#        if "Content-Security-Policy"     in flow.response.headers: del flow.response.headers["Content-Security-Policy"]
#
#        if "access-control-allow-origin" in flow.response.headers: del flow.response.headers["access-control-allow-origin"]
#        if "content-security-policy"     in flow.response.headers: del flow.response.headers["content-security-policy"]
#
#        flow.response.headers["access-control-allow-origin"] = "*"
#        flow.response.headers["content-security-policy"] = "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline'; font-src * data: blob: 'unsafe-inline';"
#
       if Utils.is_html(flow):
           if "Content-Type" in flow.response.headers: del flow.response.headers["Content-Type"]
           if "content-type" in flow.response.headers: del flow.response.headers["content-type"]
           flow.response.headers["content-type"] = "text/html; charset=utf-8"
#            # soup = BeautifulSoup(flow.response.content, 'lxml')
#            # flow.response.content = htmlmin.minify(soup.prettify(), remove_empty_space=True).encode(encoding='utf-8')

