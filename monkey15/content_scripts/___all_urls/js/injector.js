/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS

class Checkers {
    static checkHost(hostPattern) {
        let pattern = new URLPattern({ hostname: hostPattern });
        return pattern.test(window.location.href);
    }

    static checkPath(pathPattern) {
        let pattern = new URLPattern({ pathname: pathPattern });
        return pattern.test(window.location.href);
    }
}

class Injectors {
    static injectScript(attributes) {
        let tag = document.createElement('script');

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            tag[attrName] = attrValue;
        }

        if (typeof attributes['is_cdn'] === 'undefined') {
            tag.src = chrome.runtime.getURL(attributes.src);
        }

        document.head.appendChild(tag);
    }

    static injectStyle(attributes) {
        let tag = document.createElement('link');
        tag.rel = 'stylesheet';

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            tag[attrName] = attrValue;
        }


        if (typeof attributes['is_cdn'] === 'undefined') {
            tag.href = chrome.runtime.getURL(attributes.href);
        }

        document.head.appendChild(tag);
    }

    static async injectHypertext(url, target=document.body, position='beforeend') {
        let markupString = await window._frt.getExtensionFileContent(url);

        let tag = document.createElement('div');
        tag.style.display = 'none';
        tag.innerHTML = markupString;

        target.insertAdjacentElement(position, tag);
    }

    static injectExternalModule(url) {
        let script = document.createElement('script');

        script.src = url;
        script.defer = true;
        script.type = 'module';

        document.body.appendChild(script);
    }
}

class Rules {
    static async kufar() {
        if (!window.location.host.endsWith('kufar.by')) return;
        LibraryLoaders.notyf();
        Injectors.injectScript({src: '/web_accessible_resources/kufar.by/js/script.js'});
    }

    static async opennet() {
        if (window.location.host !== 'www.opennet.ru') return;
        Injectors.injectScript({src: '/web_accessible_resources/opennet.ru/js/no_comments.js'});
    }

    static async reactor() {
        if (!window.location.host.endsWith('reactor.cc')) return;

        await Injectors.injectHypertext('/web_accessible_resources/joyreactor.cc/html/comment_text_tools.html');

        Injectors.injectStyle({href: '/web_accessible_resources/joyreactor.cc/css/comment_text_tools.css'});
        Injectors.injectStyle({href: '/web_accessible_resources/joyreactor.cc/css/rate4comments.css'});

        Injectors.injectScript({src: '/web_accessible_resources/joyreactor.cc/js/comment_text_tools.js'});
        Injectors.injectScript({src: '/web_accessible_resources/joyreactor.cc/js/play_shortcut.js'});
        Injectors.injectScript({src: '/web_accessible_resources/joyreactor.cc/js/rate4comments.js'});
        Injectors.injectScript({src: '/web_accessible_resources/joyreactor.cc/js/script.js'});
        Injectors.injectScript({src: '/web_accessible_resources/joyreactor.cc/js/unhide_comments.js'});
    }

    static async twitch() {
        if (window.location.host !== 'www.twitch.tv') return;

        Injectors.injectScript({src: '/web_accessible_resources/twitch.tv/js/script.js'});
        Injectors.injectStyle({href: '/web_accessible_resources/twitch.tv/css/directory.css'});
    }

    static async yandex_market() {
        if (window.location.host !== 'market.yandex.ru') return;

        if (window.location.pathname.startsWith('/product--karta-pamiati-') ||
            window.location.pathname.startsWith('/product--tverdotelnyi-nakopitel-')) {
            Injectors.injectScript({src: '/web_accessible_resources/market.yandex.ru/js/price_per_gb.js'});
        }
    }

    static async example() {
        if (window.location.host !== 'market.yandex.ru') return;
        if (!window.location.host.endsWith('wikia.com')) return;
        if (!window.location.href.startsWith('https://5ka.ru/special_offers')) return;

        await Injectors.injectHypertext('/web_accessible_resources/habr.com/html/fav_table.html');
        Injectors.injectStyle({href: '/web_accessible_resources/pixlr.com/css/styles.css'});
        Injectors.injectScript({src: '/web_accessible_resources/pixlr.com/js/adblock.js'});
    }

    static async main() {
        // inject shared utils
        Injectors.injectScript({
            src: '/web_accessible_resources/_all_urls/js/utils.js',
            async: true,
        });

        // call all other injectors
        let injectors = Object.getOwnPropertyNames(Rules);
        injectors = injectors.filter(prop => typeof Rules[prop] === 'function');
        injectors = injectors.filter(prop => prop !== 'main').filter(prop => prop !== 'example');
        for (const injector of injectors) Rules[injector]();
    }
}

class LibraryLoaders {
    static bootStrap() {
        Injectors.injectStyle({
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
            is_cdn: true,
        });

        Injectors.injectScript({
            src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js',
            async: true,
            is_cdn: true,
        });
    }

    static fontAwesome() {
        Injectors.injectStyle({
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
            is_cdn: true,
        });
    }

    static jQuery() {
        if (typeof jQuery !== 'undefined') return;

        Injectors.injectScript({
            src: '/web_accessible_resources/_libs/jquery.js',
            async: true,
        });
    }

    static notyf() {
        Injectors.injectStyle({
            href: '/web_accessible_resources/_libs/notyf/notyf.min.css',
        });

        Injectors.injectScript({
            src: '/web_accessible_resources/_libs/notyf/notyf.min.js',
            async: true,
        });
    }

    static notify() {
        this.jQuery();

        setTimeout(() => {
            Injectors.injectScript({
                src: 'https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js',
                async: true,
                is_cdn: true,
            });
        }, 300); // need setTimeout to wait jquery load
    }


}

window.onload = () => {
    setTimeout(async () => {
        await Rules.main();
    }, 1530);
};
