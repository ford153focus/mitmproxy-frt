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
    static async yandex_market() {
        if (window.location.host !== 'market.yandex.ru') return;

        if (window.location.pathname.startsWith('/product--karta-pamiati-') ||
            window.location.pathname.startsWith('/product--tverdotelnyi-nakopitel-')) {
            InjectorUtils.injectScript('/web_accessible_resources/market.yandex.ru/js/price_per_gb.js');
        }
    }

    static async example() {
        if (window.location.host !== 'market.yandex.ru') return;
        if (!window.location.host.endsWith('wikia.com')) return;
        if (!window.location.href.startsWith('https://5ka.ru/special_offers')) return;

        await InjectorUtils.injectHypertext('/web_accessible_resources/habr.com/html/fav_table.html');
        InjectorUtils.injectStyle('/web_accessible_resources/pixlr.com/css/styles.css');
        InjectorUtils.injectScript('/web_accessible_resources/pixlr.com/js/adblock.js');    
    }

    static async main() {
        // inject shared utils
        InjectorUtils.injectScript('/web_accessible_resources/_all_urls/js/utils.js', true, 'high');

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
