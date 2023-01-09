"""
Basic skeleton of a mitmproxy addon.

Run as follows: mitmproxy -s main.py
"""

from addons.all_domains.utils_injector import Injector
from addons.all_domains.black_list import BlackList

from addons.domain_specific.auchan_ru import Auchan
from addons.domain_specific.auto_ru import AutoRu
from addons.domain_specific.avito_ru import Avito
from addons.domain_specific.championat import Сhampionat
from addons.domain_specific.cian import Cian
from addons.domain_specific.dddnews import DailyDigitalDigest
from addons.domain_specific.dixy_ru import Dixy
from addons.domain_specific.example_com import ExampleCom
from addons.domain_specific.fandom_com import Fandom
from addons.domain_specific.fastpic_org import FastPic
from addons.domain_specific.hh_ru import HeadHunter
from addons.domain_specific.lenta_com import Lenta
from addons.domain_specific.motor_ru import Motor
from addons.domain_specific.nine_gag import NineGag
from addons.domain_specific.opennet_ru import OpenNet
from addons.domain_specific.pixlr_com import Pixlr
from addons.domain_specific.pka import Pyatyorochka
from addons.domain_specific.reactor_cc import Reactor
from addons.domain_specific.twitch_tv import Twitch
from addons.domain_specific.yandex import Yandex
from addons.domain_specific.honeyhunterworld import HoneyHunterWorld
from addons.domain_specific.openwrt import OpenWRT
from addons.domain_specific.wikia_com import Wikia

addons = [
    Injector(),
    BlackList(),

    Auchan(),
    AutoRu(),
    Avito(),
    Сhampionat(),
    Cian(),
    DailyDigitalDigest(),
    Dixy(),
    ExampleCom(),
    Fandom(),
    FastPic(),
    HeadHunter(),
    Lenta(),
    Motor(),
    NineGag(),
    OpenNet(),
    Pixlr(),
    Pyatyorochka(),
    Reactor(),
    Twitch(),
    Yandex(),
    HoneyHunterWorld(),
    OpenWRT(),
    Wikia(),
]
