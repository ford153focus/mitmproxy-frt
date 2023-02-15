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

    static injectScript(attributes) {
        let tag = document.createElement('script');

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            tag[attrName] = attrValue;
        }

        tag.src = chrome.runtime.getURL(attributes.src);
        document.head.appendChild(tag);
    }

    static injectStyle(attributes) {
        let tag = document.createElement('link');
        tag.rel = 'stylesheet';

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            tag[attrName] = attrValue;
        }

        tag.href = chrome.runtime.getURL(attributes.href);
        document.head.appendChild(tag);
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
    static async kufar() {
        if (!window.location.host.endsWith('kufar.by')) return;

        InjectorUtils.injectScript({src: '/web_accessible_resources/kufar.by/js/script.js'});
    }

    static async twitch() {
        if (window.location.host !== 'www.twitch.tv') return;

        InjectorUtils.injectScript({src: '/web_accessible_resources/twitch.tv/js/script.js'});
        InjectorUtils.injectStyle({href: '/web_accessible_resources/twitch.tv/css/directory.css'});
    }

    static async yandex_market() {
        if (window.location.host !== 'market.yandex.ru') return;

        if (window.location.pathname.startsWith('/product--karta-pamiati-') ||
            window.location.pathname.startsWith('/product--tverdotelnyi-nakopitel-')) {
            InjectorUtils.injectScript({src: '/web_accessible_resources/market.yandex.ru/js/price_per_gb.js'});
        }
    }

    static async example() {
        if (window.location.host !== 'market.yandex.ru') return;
        if (!window.location.host.endsWith('wikia.com')) return;
        if (!window.location.href.startsWith('https://5ka.ru/special_offers')) return;

        await InjectorUtils.injectHypertext('/web_accessible_resources/habr.com/html/fav_table.html');
        InjectorUtils.injectStyle({href: '/web_accessible_resources/pixlr.com/css/styles.css'});
        InjectorUtils.injectScript({src: '/web_accessible_resources/pixlr.com/js/adblock.js'});
    }

    static async main() {
        // inject shared utils
        InjectorUtils.injectScript({
            src: '/web_accessible_resources/_all_urls/js/utils.js',
            async: true,
        });

        // call all other injectors
        let injectors = Object.getOwnPropertyNames(Injectors);
        injectors = injectors.filter(prop => typeof Injectors[prop] === 'function');
        injectors = injectors.filter(prop => prop !== 'main').filter(prop => prop !== 'example');
        for (const injector of injectors) Injectors[injector]();
    }
}

window.onload = () => {
    setTimeout(async () => {
        await Injectors.main();
    }, 1530);
};
