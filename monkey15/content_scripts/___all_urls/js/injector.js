/* eslint-disable no-undef */
// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS

class InjectorUtils {
    static checkHost(hostPattern) {
        let pattern = new URLPattern({ hostname: hostPattern });
        return pattern.test(window.location.href);
    }

    static checkPath(pathPattern) {
        let pattern = new URLPattern({ pathname: pathPattern });
        return pattern.test(window.location.href);
    }

    static injectScript(url, defer = true, fetchPriority = 'low') {
        let script = document.createElement('script');

        script.src = chrome.runtime.getURL(url);
        script.defer = defer;
        script.fetchpriority = fetchPriority;

        document.head.appendChild(script);
    }

    static injectStyle(url) {
        window._frt.utils.loadStyleSheet(
            chrome.runtime.getURL(url)
        );
    }

    static async injectHypertext(url) {
        let markupString = await window._frt.utils.getExtensionFileContent(url);
        let elements = window._frt.utils.strToDom(markupString);
        for (const element of elements) {
            document.body.appendChild(element.cloneNode(true));
        }
    }

    static async injectHypertext2(url, target, position) {
        let markupString = await window._frt.utils.getExtensionFileContent(url);
        target.insertAdjacentHTML(position, markupString);
    }

    static injectExternalModule(url) {
        let script = document.createElement('script');

        script.src = url;
        script.defer = true;
        script.type = 'module';

        document.body.appendChild(script);
    }
}

class Injectors {
    static async auchan() {
        if (!window.location.host.endsWith('auchan.ru')) return;

        if (window.location.pathname.startsWith('/catalog') ||
            window.location.pathname.startsWith('/superceny')) {
            await InjectorUtils.injectHypertext2(
                '/web_accessible_resources/supermarkets/auchan.ru/html/filtersBar.html',
                document.querySelector('h1').parentElement,
                'beforeend'
            );

            InjectorUtils.injectStyle('/web_accessible_resources/supermarkets/auchan.ru/css/styles.css');

            InjectorUtils.injectScript('/web_accessible_resources/supermarkets/auchan.ru/js/script.js');
        }

        if (window.location.pathname.startsWith('/cart')) {
            InjectorUtils.injectScript('/web_accessible_resources/supermarkets/auchan.ru/js/cart_printer.js');
        }
    }

    static async autoRu() {
        if (!window.location.host.endsWith('auto.ru')) return;
        InjectorUtils.injectScript('/web_accessible_resources/auto.ru/js/adblock.js');
    }

    static async avito() {
        if (!InjectorUtils.checkHost('*.avito.ru')) return;

        InjectorUtils.injectScript('/web_accessible_resources/avito.ru/js/adblock.js');
        InjectorUtils.injectScript('/web_accessible_resources/avito.ru/js/ad_filter.js');

        InjectorUtils.injectStyle('/web_accessible_resources/avito.ru/css/styles.css');

        if (InjectorUtils.checkPath('/*/*')) {
            InjectorUtils.injectScript('/web_accessible_resources/avito.ru/js/ad_hider.js');
            InjectorUtils.injectScript('/web_accessible_resources/avito.ru/js/hotkeys.js');
        }

        if (InjectorUtils.checkPath('/autosearch')) {
            InjectorUtils.injectScript('/web_accessible_resources/avito.ru/js/autosearch_sort.js');
        }
    }

    static async championat() {
        if (!InjectorUtils.checkHost('*.championat.com')) return;

        InjectorUtils.injectScript('/web_accessible_resources/championat.com/js/adblock.js');
        InjectorUtils.injectScript('/web_accessible_resources/championat.com/js/no_partners.js');

        if (InjectorUtils.checkPath('/*/article-*') || InjectorUtils.checkPath('/*/news-*')) {
            await InjectorUtils.injectHypertext('/web_accessible_resources/championat.com/html/comments_handler.html');
            InjectorUtils.injectScript('/web_accessible_resources/championat.com/js/comments_handler.js');
            InjectorUtils.injectStyle('/web_accessible_resources/championat.com/css/comments_handler.css');
        }
    }

    static async cian() {
        if (!window.location.host.endsWith('cian.ru')) return;
        InjectorUtils.injectScript('/web_accessible_resources/cian.ru/js/ban_nationalism.js');
    }

    static async daily_digital_digest() {
        if (window.location.host !== '3dnews.ru') return;
        InjectorUtils.injectScript('/web_accessible_resources/3dnews.ru/js/script.js');
    }

    static async dixy() {
        if (!window.location.hostname.endsWith('dixy.ru')) return;

        if (window.location.pathname === '/catalog/') {
            InjectorUtils.injectScript('/web_accessible_resources/supermarkets/dixy.ru/js/catalog.js');
        }
    }

    static async fastpic() {
        if (!window.location.hostname.endsWith('fastpic.org')) return;

        InjectorUtils.injectScript('/web_accessible_resources/fastpic.org/adblock.js');
    }

    static async joyreactor() {
        if (!window.location.hostname.endsWith('reactor.cc')) return;

        window._frt.utils.loadFontAwesome();
        await InjectorUtils.injectHypertext('/web_accessible_resources/joyreactor.cc/html/comment_text_tools.html');

        InjectorUtils.injectStyle('/web_accessible_resources/joyreactor.cc/css/comment_text_tools.css');
        InjectorUtils.injectStyle('/web_accessible_resources/joyreactor.cc/css/rate4comments.css');

        InjectorUtils.injectScript('/web_accessible_resources/joyreactor.cc/js/comment_text_tools.js');
        InjectorUtils.injectScript('/web_accessible_resources/joyreactor.cc/js/script.js');
        InjectorUtils.injectScript('/web_accessible_resources/joyreactor.cc/js/play_shortcut.js');
        InjectorUtils.injectScript('/web_accessible_resources/joyreactor.cc/js/rate4comments.js');
        InjectorUtils.injectScript('/web_accessible_resources/joyreactor.cc/js/unhide_comments.js');
    }

    static async habr() {
        if (window.location.host !== 'habr.com') return;

        switch (true) {
        case(window.location.pathname.endsWith('/favorites/')):
        case(window.location.pathname.endsWith('/favorites/posts/')):
            await InjectorUtils.injectHypertext('/web_accessible_resources/habr.com/html/fav_table.html');
            InjectorUtils.injectScript('/web_accessible_resources/habr.com/js/fav_table.js');
            InjectorUtils.injectStyle('/web_accessible_resources/habr.com/css/fav_table.css');
            break;
        case(InjectorUtils.checkPath('/post/*/')):
        case(InjectorUtils.checkPath('/*/post/*/')):
        case(InjectorUtils.checkPath('/*/blog/*/')):
            InjectorUtils.injectScript('/web_accessible_resources/habr.com/js/no_comments.js');
            break;
        }
    }

    static async headhunter() {
        if (!InjectorUtils.checkHost('*.hh.ru')) return;

        if (InjectorUtils.checkPath('/applicant/resumes/edit/experience')) {
            InjectorUtils.injectScript('/web_accessible_resources/hh.ru/js/fix_height.js');
        }
    }

    static async lenta() {
        if (window.location.host !== 'lenta.com') return;

        if (window.location.pathname.startsWith('/catalog') ||
            window.location.pathname.startsWith('/search')) {
            InjectorUtils.injectScript('/web_accessible_resources/supermarkets/lenta.com/js/sort.js');
        }

        if (window.location.pathname.startsWith('/order/cart')) {
            InjectorUtils.injectScript('/web_accessible_resources/supermarkets/lenta.com/js/print_cart.js');
        }
    }

    static async lor() {
        if (window.location.host !== 'www.linux.org.ru') return;

        InjectorUtils.injectScript('/web_accessible_resources/linux.org.ru/js/shared_lib.js');

        switch (true) {
        case (InjectorUtils.checkPath('/forum/*/*')):
        case (InjectorUtils.checkPath('/gallery/*/*')):
        case (InjectorUtils.checkPath('/news/*/*')):
        case (InjectorUtils.checkPath('/polls/polls/*')):
            InjectorUtils.injectScript('/web_accessible_resources/linux.org.ru/js/msg_toolbar.js');
            InjectorUtils.injectScript('/web_accessible_resources/linux.org.ru/js/topic_utils.js');
            break;
        case (InjectorUtils.checkPath('/people/*/favs')):
        case (InjectorUtils.checkPath('/people/*/tracked')):
            InjectorUtils.injectScript('/web_accessible_resources/linux.org.ru/js/favs_utils.js');
            break;
        case (window.location.pathname === '/tracker/'):
            InjectorUtils.injectScript('/web_accessible_resources/linux.org.ru/js/tracker_utils.js');
            break;
        }
    }

    static async motor() {
        if (window.location.host !== 'motor.ru') return;
        InjectorUtils.injectScript('/web_accessible_resources/motor.ru/js/adblock.js');
    }

    static async nine_gag() {
        if (!window.location.href.startsWith('https://9gag.com/gag/')) return;
        InjectorUtils.injectScript('/web_accessible_resources/9gag.com/js/resize_answer_field.js');
    }

    static async opennet() {
        if (!window.location.href.startsWith('https://www.opennet.ru/opennews/art.shtml?num=')) return;
        InjectorUtils.injectScript('/web_accessible_resources/opennet.ru/js/no_comments.js');
    }

    static async pixlr() {
        if (!window.location.href.startsWith('https://pixlr.com/editor/')) return;
        InjectorUtils.injectStyle('/web_accessible_resources/pixlr.com/css/styles.css');
        InjectorUtils.injectScript('/web_accessible_resources/pixlr.com/js/adblock.js');
    }

    static async pka() {
        if (!window.location.href.startsWith('https://5ka.ru/special_offers')) return;
        InjectorUtils.injectScript('/web_accessible_resources/supermarkets/5ka.ru/js/sort.js');
    }

    static async twitch() {
        if (!window.location.host.endsWith('twitch.tv')) return;

        InjectorUtils.injectScript('/web_accessible_resources/twitch.tv/js/script.js');
        InjectorUtils.injectStyle('/web_accessible_resources/twitch.tv/css/directory.css');
    }

    static async wikia() {
        if (!window.location.host.endsWith('wikia.com')) return;
        InjectorUtils.injectScript('/web_accessible_resources/wikia.com/js/adblock.js');
    }

    static async yandex_market() {
        if (window.location.host !== 'market.yandex.ru') return;
        InjectorUtils.injectScript('/web_accessible_resources/market.yandex.ru/js/script.js');
    }

    static async main() {
        // inject shared utils
        InjectorUtils.injectScript('/web_accessible_resources/all_urls/js/utils.js', true, 'high');

        // call all other injectors
        let injectors = Object.getOwnPropertyNames(Injectors);
        injectors = injectors.filter(prop => typeof Injectors[prop] === 'function');
        injectors = injectors.filter(prop => prop !== 'main');
        for (const injector of injectors) Injectors[injector]();
    }
}

window.onload = () => {
    setTimeout(async () => {
        await Injectors.main();
    }, 1530);
};
