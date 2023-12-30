// noinspection JSUnusedGlobalSymbols
class Rules {
    static async tenMinutesMail() {
        if (window.location.host !== '10minutemail.net') return;
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/10minutemail.net/js/extend_timer.js'});
    }

    static async almi() {
        if (window.location.href.startsWith('https://almi-dostavka.by/catalog/')) {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/almi-dostavka.by/js/catalog.js'});
            await window._frt.Injectors.injectInternalHTML('/web_accessible_resources/almi-dostavka.by/html/sort-button.html');
        }

        if (window.location.href.startsWith('https://almi-dostavka.by/basket/')) {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/almi-dostavka.by/js/cart.js'});
        }
    }

    static async avito() {
        if (window.location.host !== 'www.avito.ru') return;

        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/notyf/notyf.min.css'});
        window._frt.Injectors.injectInternalScript(    {src:  '/node_modules/notyf/notyf.min.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/_all_urls/js/libraries/bans.js'});

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/avito.ru/js/ad_filter.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/avito.ru/js/ad_hider.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/avito.ru/js/adblock.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/avito.ru/js/autosearch_sort.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/avito.ru/js/hotkeys.js'});
        window._frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/avito.ru/css/styles.css'});
    }

    static async computerUniverse() {
        if (window.location.host !== 'www.computeruniverse.net') return;

        if (window.location.pathname.endsWith('/cart')) {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/computeruniverse.net/js/cart.js'});
        }
    }

    static async eAuction_by() {
        if (window.location.host === 'e-auction.by') {
            window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/notyf/notyf.min.css'});
            window._frt.Injectors.injectInternalScript(    {src:  '/node_modules/notyf/notyf.min.js'});
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/_all_urls/js/libraries/bans.js'});
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/e-auction.by/js/script.js'});
        }
    }

    static async evroopt() {
        if (window.location.href.startsWith('https://evroopt.by/redprice/'))
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/evroopt.by/js/catalog.js'});

        if (window.location.href.startsWith('https://yamigom-store.by/category/')) {
            await window._frt.Injectors.injectInternalHTML('/web_accessible_resources/evroopt.by/html/yamigom_sort_btn.html');
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/evroopt.by/js/yamigom_catalog.js'});
        }

        if (window.location.href === 'https://yamigom-store.by/cart') {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/evroopt.by/js/yamigom_cart.js'});
        }
    }

    static async edostavka_by() {
        if (window.location.href.startsWith('https://edostavka.by/category/')) {
            await window._frt.Injectors.injectInternalHTML('/web_accessible_resources/almi-dostavka.by/html/sort-button.html');

            window._frt.Injectors.injectInternalScript({
                src: '/web_accessible_resources/edostavka.by/js/catalog.js'}
            );
        }

        if (window.location.href.startsWith('https://edostavka.by/cart')) {
            window._frt.Injectors.injectInternalScript({
                src: '/web_accessible_resources/edostavka.by/js/cart.js'}
            );
        }
    }

    static async fandom_wiki() {
        if (!window.location.host.endsWith('fandom.com')) return;

        document.querySelector('.top-ads-container').remove();

        if (window.location.host.startsWith('genshin-impact')) {
            window._frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/fandom.com/genshin-impact/css/styles.css'});

            if (window.location.pathname === '/wiki/Event')                        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/fandom.com/genshin-impact/js/event_list.js'});
            if (window.location.pathname === '/wiki/Hidden_Exploration_Objective') window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/fandom.com/genshin-impact/js/hidden_exploration_objective.js'});
            if (window.location.pathname === '/wiki/Wonders_of_the_World')         window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/fandom.com/genshin-impact/js/wonders_of_the_world.js'});
            if (window.location.pathname === '/wiki/World_Quest/List')             window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/fandom.com/genshin-impact/js/world_quests_list.js'});
        }
    }

    static async kufar() {
        if (!window.location.host.endsWith('kufar.by')) return;

        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/notyf/notyf.min.css'});
        window._frt.Injectors.injectInternalScript(    {src:  '/node_modules/notyf/notyf.min.js'});
        window._frt.Injectors.injectInternalScript(    {src:  '/node_modules/js-cookie/dist/js.cookie.min.js'});

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/_all_urls/js/libraries/bans.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/kufar.by/js/script.js'});
        window._frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/kufar.by/css/styles.css'});
        await window._frt.Injectors.injectInternalHTML('/web_accessible_resources/kufar.by/html/filter_button.html');
    }

    static async musicbrainz() {
        if (!window.location.host.endsWith('musicbrainz.org')) return;
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/musicbrainz.org/js/marker.js'});
    }

    static async onliner() {
        if (window.location.host === 'ab.onliner.by') {
            window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/notyf/notyf.min.css'});
            window._frt.Injectors.injectInternalScript(    {src:  '/node_modules/notyf/notyf.min.js'});

            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/_all_urls/js/libraries/bans.js'});
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/onliner.by/js/ab.js'});
        }

        if (window.location.host === 'catalog.onliner.by') {
            if (window.location.pathname.startsWith('/ssd') ||
                window.location.pathname.startsWith('/memcards')) {
                window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/onliner.by/js/ssd.js'});
            }
        }
    }

    static async OpenNet() {
        if (window.location.host !== 'www.opennet.ru') return;
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/opennet.ru/js/no_comments.js'});
    }

    static async OpenWRT() {
        if (!window.location.href.startsWith('https://openwrt.org/toh/views/toh_')) return;

        await window._frt.Injectors.injectInternalHTML(
            '/web_accessible_resources/openwrt.org/html/toolbar.html',
            document.querySelector('.dataaggregation .filter'),
            'beforeend'
        );

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/openwrt.org/js/sort.js'});
    }

    static async pepper_ru() {
        if (window.location.host !== 'www.pepper.ru') return;

        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/@fortawesome/fontawesome-free/css/all.css'});

        await window._frt.Injectors.injectInternalHTML(
            '/web_accessible_resources/pepper.ru/html/sorting-panel.html',
            document.querySelector('.subNav .tGrid-cell.width--all-12'),
            'beforeend'
        );

        window._frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/pepper.ru/css/style.css'});

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/pepper.ru/js/script.js'});

        if (window.location.pathname.startsWith('/groups/ssd') || window.location.pathname.startsWith('/groups/memory-cards')) {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/pepper.ru/js/ssd.js'});
        }
    }

    static async reactor_cc() {
        if (!window.location.host.endsWith('reactor.cc')) return;

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/comment_text_tools.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/play_shortcut.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/rate_highlighted.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/script.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/share_buttons.js'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/joyreactor.cc/js/unhide_comments.js'});
    }

    static async reddit() {
        let comments_url_pattern = new window.URLPattern('/r/*/comments/*/*/', 'https://www.reddit.com');
        if (!comments_url_pattern.test(window.location.href)) return;

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/reddit.com/show_all_comments.js'});
    }

    static async sosedi_by() {
        if (window.location.href.startsWith('https://sosedi.by/sales/')) {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/sosedi.by/js/sales.js'});
        }

        if (window.location.href.startsWith('https://sosedi.by/personal/')) {
            window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/sosedi.by/js/cart.js'});
        }
    }

    static async twitch() {
        if (window.location.host !== 'www.twitch.tv') return;

        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/twitch.tv/js/script.js'});
        window._frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/twitch.tv/css/directory.css'});
    }

    static async yandex_market() {
        if (window.location.host !== 'market.yandex.ru') return;

        (() => {
            let cats = [
                'Внутренние твердотельные накопители (SSD)',
                'Внутренние жесткие диски',
                'Внешние жесткие диски и SSD',
                'Карты памяти',
                'USB флеш-накопители',
            ];

            for (const cat of cats) {
                let query = `//span[@itemprop='name'][text()='${cat}']`;

                if (window._frt.utils.getElementsByXPath(query).length) {
                    window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/market.yandex.ru/js/price_per_gb.js'});
                    return;
                }
            }
        })();
    }

    static async example() {
        if (window.location.host !== 'market.yandex.ru') return;
        if (!window.location.host.endsWith('wikia.com')) return;
        if (!window.location.href.startsWith('https://5ka.ru/special_offers')) return;

        await window._frt.Injectors.injectInternalHTML('/web_accessible_resources/habr.com/html/fav_table.html');
        window._frt.Injectors.injectInternalStyleSheet({href: '/web_accessible_resources/pixlr.com/css/styles.css'});
        window._frt.Injectors.injectInternalScript({src: '/web_accessible_resources/pixlr.com/js/adblock.js'});
    }

    static async main() {
        window._frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/extensions.js',
            async: true,
        });

        window._frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/fetchers.js',
            async: true,
        });

        window._frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/injectors.js',
            async: true,
        });

        window._frt.Injectors.injectInternalScript({
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
