HTMLElement.prototype.frtHide = window._frt.ext.HTMLElement.frtHide;
String.prototype.frtFixSpaces = window._frt.ext.String.frtFixSpaces;
if (!window.___frt) window.___frt = {};

window.___frt.KufarInjectors = class {
    static inject_ban_button_on_details_page () {
        let wr_button = window._frt.utils.getElementsByXPath('//button[text()="Позвонить"]').shift();
        if (!wr_button) wr_button = window._frt.utils.getElementsByXPath('//button[text()="Пазваніць"]').shift();
        if (!wr_button) wr_button = window._frt.utils.getElementsByXPath('//button[text()="Написать"]').shift();
        if (!wr_button) wr_button = window._frt.utils.getElementsByXPath('//button[text()="Напісаць"]').shift();
        if (!wr_button) return;
        let clone = wr_button.cloneNode(true);
        clone.innerHTML='Скрывать это объявление';
        clone.style.backgroundColor = 'red';
        clone.style.color = 'lightgrey';

        clone.onclick = () => {
            window._frt.Bans.add(window.location.pathname);
        };

        wr_button.insertAdjacentElement('afterend', clone);
    }

    static inject_ban_button_to_listing () {
        let button = document.createElement('button');

        button.className = 'ban-it';
        button.innerHTML = 'Скрывать';

        button.style['margin-top']       = ' 1mm';
        button.style['padding']          = '2mm 0';
        button.style['background-color'] = ' darkorange';
        button.style['cursor']           = 'pointer';

        let click = (e) => {
            e.preventDefault();

            let href= e.target.parentElement.parentElement.href;
            let url = new URL(href);
            let path = url.pathname;
            window._frt.Bans.add(path);
            window.___frt.KufarListingManipulators.hide_banned();
        };

        for (const el of document.querySelectorAll('[class^="styles_cards"] section [class^="styles_content"]')) {
            if (el.querySelector('button.ban-it') !== null) continue;
            let clone = button.cloneNode(true);
            clone.onclick = click;
            el.insertAdjacentElement('beforeend', clone);
        }
    }

};

window.___frt.KufarListingManipulators = class {
    static ad_block () {
        for (let el of document.querySelectorAll('[class^="styles_banner"]')) el.frtHide();
        for (let el of document.querySelectorAll('[class^="styles_poleposition"]')) el.frtHide();
        for (let el of document.querySelectorAll('[class^="styles_bannerContainer"]')) el.frtHide();
        for (let el of document.querySelectorAll('[class^="styles_recently-viewed"]')) el.frtHide();
        for (let el of document.querySelectorAll('[alt="placeholder"]')) el.parentElement.parentElement.parentElement.frtHide();

        for (let el of document.querySelectorAll('img[alt="vip"]')) el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.frtHide();
        for (let el of window._frt.utils.getElementsByXPath('//a[contains(@class, "highlighted")]')) el.parentElement.frtHide();

        document.querySelector('[class^="styles_buttons-right__container"] button')?.click();

        for (let h3 of document.getElementsByTagName('h3')) {
            if (h3.innerText === 'Товары с доставкой от магазинов') {
                h3.parentElement.frtHide();
            }
        }
    }

    static hide_banned() {
        setInterval(() => {
            let bans = window._frt.Bans.get();

            for (const el of document.querySelectorAll('[class^="styles_cards"] section > a')) {
                let href = el?.href;
                if (!href) continue;
                let url = new URL(href);
                let path = url.pathname;

                if (bans.includes(path)) {
                    el.parentElement.style.display = 'none';
                }
            }

            for (const el of document.querySelectorAll('[data-name="kufar-similar-ads-block"] [class^="styles_card"] a')) {
                let href = el?.href;
                if (!href) continue;
                let url = new URL(href);
                let path = url.pathname;

                if (bans.includes(path)) {
                    el.parentElement.style.display = 'none';
                }
            }
        }, 5555);
    }

    static mark_broken() {
        let black_list = [
            'запчаст',
            'на детали',
            'по частям',
            'не включается',
            'разбор',
            'з.ч',
            'з/ч',
            'зап.ч',
        ];

        if (window.location.pathname.endsWith('/kupit/kvartiru')) {
            black_list.push('продается доля');
        }

        let h3s = document.getElementsByTagName('h3');
        let bodies = document.querySelectorAll('[class^="styles_content"] [class^="styles_body"]');
        let targets = Array.prototype.concat(Array.from(h3s), Array.from(bodies));

        for (const el of targets) {
            for (let word of black_list) {
                if (el.innerText.toLocaleLowerCase().includes(word)) {
                    let section = el.parentElement.parentElement.parentElement;
                    let wrapper = section.querySelector('[class^="styles_wrapper"]');

                    if (section) section.style.backgroundColor = 'red';
                    if (wrapper) wrapper.style.backgroundColor = 'red';
                }
            }
        }
    }

    static highlight_near_districts() {
        for (const el of document.querySelectorAll('[class^="styles_cards"] section')) {
            let secondary = el.querySelector('div[class^="styles_secondary__"] > p');
            let district = secondary?.innerText?.trim()?.frtFixSpaces();

            switch (district) {
                case 'Минск, Фрунзенский':
                    secondary.style.backgroundColor = '#5f5';
                    break;
                case 'Минск, Московский':
                    secondary.style.backgroundColor = '#5c5';
                    break;
            }
        }
    }

    static photo_required() {
        let targets = [
            'Толькі з фота',
            'Только с фото',
        ];

        for (const target of targets) {
            /** @type HTMLLabelElement */
            let label = document.querySelector(`[data-name="${target}"]`);
            if (label === null) continue;

            /** @type HTMLInputElement */
            let checkBox = label.previousSibling;
            if (checkBox === null) continue;
            if (checkBox.constructor.name !== 'HTMLInputElement') continue;
            if (checkBox.checked) continue;
            label.click();

            document.querySelector('[type="submit"]').click();
        }
    }
};

window.___frt.Kufar = class {
    observerCallback() {
        window.___frt.KufarInjectors.inject_ban_button_to_listing();

        window.___frt.KufarListingManipulators.ad_block();
        window.___frt.KufarListingManipulators.hide_banned();
        window.___frt.KufarListingManipulators.mark_broken();
        window.___frt.KufarListingManipulators.highlight_near_districts();
        // window.___frt.KufarListingManipulators.photo_required();
    }

    constructor() {
        setTimeout(() => {
            window.___frt.KufarInjectors.inject_ban_button_on_details_page();

            this.observer = new MutationObserver(this.observerCallback.bind(this));
            const config = { attributes: true, childList: true, subtree: true };
            this.observer.observe(document.body, config);

            this.observerCallback();
        }, 333);
    }
};

window.___frt.kufar = new window.___frt.Kufar();
