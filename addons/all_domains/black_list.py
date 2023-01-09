from mitmproxy import http
from db_utils import db


class BlackList:
    async def blacklist1(self, flow: http.HTTPFlow) -> None:
        db.cursor.execute(
            "SELECT * FROM hosts_blacklist WHERE host = %s",
            (flow.request.host,)
        )

        _ = db.cursor.fetchall()

        if db.cursor.rowcount > 0:
            flow.response = http.Response.make(
                403,  # (optional) status code
                b"Forbidden",  # (optional) content
                # (optional) headers
                {"Content-Type": "text/plain; charset=utf-8"},
            )

    async def blacklist2(self, flow: http.HTTPFlow) -> None:
        core_host = flow.request.host.split(".")[-2]+"."+flow.request.host.split(".")[-1]

        db.cursor.execute(
            "SELECT * FROM hosts_blacklist_2 WHERE host = %s",
            (core_host,)
        )

        _ = db.cursor.fetchall()

        if db.cursor.rowcount > 0:
            flow.response = http.Response.make(
                403,  # (optional) status code
                b"Forbidden",  # (optional) content
                # (optional) headers
                {"Content-Type": "text/plain; charset=utf-8"},
            )

    async def request(self, flow: http.HTTPFlow) -> None:
        await self.blacklist1(flow)
        await self.blacklist2(flow)
