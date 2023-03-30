// noinspection JSUnusedGlobalSymbols
class Rules {
    static async evroopt() {
        if (window.location.href.startsWith('https://evroopt.by/redprice/'))
            _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/evroopt.by/js/catalog.js'});

        if (window.location.href.startsWith('https://yamigom-store.by/category/')) {
            await _frt.Injectors.injectInternalHTML('/web_accessible_resources/evroopt.by/html/yamigom_sort_btn.html');
            _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/evroopt.by/js/yamigom_catalog.js'});
        }

        if (window.location.href === 'https://yamigom-store.by/cart') {
            _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/evroopt.by/js/yamigom_cart.js'});
        }

    }

    static async fandom_wiki() {
        if (!window.location.host.endsWith('fandom.com')) return;

        document.querySelector(".top-ads-container").remove();

        if (window.location.host.startsWith('genshin-impact')) {
            if (window.location.pathname === '/wiki/Event') {
                _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/fandom.com/genshin-impact/event_list.js'});
            }
            if (window.location.pathname === '/wiki/Hidden_Exploration_Objective') {
                _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/fandom.com/genshin-impact/hidden_exploration_objective.js'});
            }
        }
    }

    static async kufar() {
        if (!window.location.host.endsWith('kufar.by')) return;
        _frt.LibraryLoaders.notyf();
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/kufar.by/js/script.js'});
    }

    static async musicbrainz() {
        if (!window.location.host.endsWith('musicbrainz.org')) return;
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/musicbrainz.org/js/marker.js'});
    }

    static async OpenNet() {
        if (window.location.host !== 'www.opennet.ru') return;
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/opennet.ru/js/no_comments.js'});
    }

    static async OpenWRT() {
        if (!window.location.href.startsWith('https://openwrt.org/toh/views/toh_available_')) return;

        await _frt.Injectors.injectInternalHTML(
            '/web_accessible_resources/openwrt.org/html/toolbar.html',
            document.querySelector(".table-responsive"),
            'beforebegin'
        );

        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/openwrt.org/js/sort.js'});
    }

    static async reactor() {
        if (!window.location.host.endsWith('reactor.cc')) return;

        await _frt.Injectors.injectInternalHTML('/web_accessible_resources/joyreactor.cc/html/comment_text_tools.html');

        _frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/joyreactor.cc/css/comment_text_tools.css'});
        _frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/joyreactor.cc/css/rate4comments.css'});

        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/comment_text_tools.js'});
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/play_shortcut.js'});
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/rate_highlighted.js'});
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/script.js'});
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/share_buttons.js'});
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/unhide_comments.js'});
    }

    static async twitch() {
        if (window.location.host !== 'www.twitch.tv') return;

        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/twitch.tv/js/script.js'});
        _frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/twitch.tv/css/directory.css'});
    }

    static async yandex_market() {
        if (window.location.host !== 'market.yandex.ru') return;

        if (window.location.pathname.startsWith('/product--karta-pamiati-') ||
            window.location.pathname.startsWith('/product--tverdotelnyi-nakopitel-')) {
            _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/market.yandex.ru/js/price_per_gb.js'});
        }
    }

    static async example() {
        if (window.location.host !== 'market.yandex.ru') return;
        if (!window.location.host.endsWith('wikia.com')) return;
        if (!window.location.href.startsWith('https://5ka.ru/special_offers')) return;

        await _frt.Injectors.injectInternalHTML('/web_accessible_resources/habr.com/html/fav_table.html');
        _frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/pixlr.com/css/styles.css'});
        _frt.Injectors.injectInternalScript({src: '/web_accessible_resources/pixlr.com/js/adblock.js'});
    }

    static async main() {
        _frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/extensions.js',
            async: true,
        });

        _frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/fetchers.js',
            async: true,
        });

        _frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/injectors.js',
            async: true,
        });

        _frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/utils.js',
            async: true,
        });

        // call all other rules
        for (const property of Object.getOwnPropertyNames(Rules))
        {
            if (typeof Rules[property] !== 'function') continue;
            if (property === 'main') continue;
            if (property === 'example') continue;
            Rules[property]();
        }
    }
}

window.onload = () => {
    setTimeout(async () => {
        await Rules.main();
    }, 1530);
};
