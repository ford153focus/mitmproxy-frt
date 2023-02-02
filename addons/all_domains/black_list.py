from mitmproxy import http
from db_utils import db


class BlackList:
    async def is_blocked(self, flow: http.HTTPFlow) -> bool:
        db.cursor.execute(
            "SELECT COUNT(*) FROM hosts_blacklist WHERE host = %s",
            (flow.request.host,)
        )

        result = db.cursor.fetchone()

        if result[0] > 0: return True

        core_host = flow.request.host.split(".")[-2]+"."+flow.request.host.split(".")[-1]

        db.cursor.execute(
            "SELECT COUNT(*) FROM hosts_blacklist_2 WHERE host = %s",
            (core_host,)
        )

        result = db.cursor.fetchone()

        if result[0] > 0: return True

        if "nitropay" in flow.request.host: return True

        return False

    async def request(self, flow: http.HTTPFlow) -> None:
        if (await self.is_blocked(flow) == True):
            flow.response = http.Response.make(
                204,  # (optional) status code
                "",  # (optional) content
                {"Content-Type": "text/plain; charset=utf-8"}, # (optional) headers
            )
