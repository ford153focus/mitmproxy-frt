if (!window.___frt) window.___frt = {};

window.___frt.Injectors = class {
    static inject_ban_button_on_details_page () {
        let buttons=[...document.querySelectorAll('button')];
        let wr_button = buttons.filter(el => el.innerText === 'Написать').shift();
        if (!wr_button) return;
        let clone = wr_button.cloneNode(true);
        clone.innerHTML='Забанить';
        clone.style.backgroundColor = 'red';

        clone.onclick = () => {
            window._frt.Bans.add(window.location.pathname);
        };

        wr_button.insertAdjacentElement('afterend', clone);
    }

    static inject_ban_button_to_listing () {
        let button = document.createElement("button");

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
            window.___frt.ListingManipulators.hide_banned();
        }

        for (const el of document.querySelectorAll('[class^="styles_cards"] section [class^="styles_content"]')) {
            if (el.querySelector('button.ban-it') !== null) continue;
            let clone = button.cloneNode(true);
            clone.onclick = click;
            el.insertAdjacentElement('beforeend', clone);
        }
    }

};

window.___frt.ListingManipulators = class {
    static ad_block () {
        for (let el of document.querySelectorAll("[class^='styles_banner']")) el.frtHide();
        for (let el of document.querySelectorAll("[class^='styles_poleposition']")) el.frtHide();
        for (let el of document.querySelectorAll("[class^='styles_bannerContainer']")) el.frtHide();
        for (let el of document.querySelectorAll("[class^='styles_recently-viewed']")) el.frtHide();
        for (let el of document.querySelectorAll("[alt='placeholder']")) el.parentElement.parentElement.parentElement.frtHide();

        for (let el of document.querySelectorAll("img[alt='vip']")) el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.frtHide();
        for (let el of _frt.utils.getElementsByXPath("//a[contains(@class, 'highlighted')]")) el.parentElement.frtHide();

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
        let headings = document.getElementsByTagName('h3');

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

        for (const el of headings)
            for (let word of black_list)
                if (el.innerText.toLocaleLowerCase().includes(word))
                    el.parentElement.parentElement.parentElement.style.backgroundColor = 'red';
    }

    static highlight_near_districts() {
        for (const el of document.querySelectorAll('[class^="styles_cards"] section')) {
            let secondary = el.querySelector('div[class^="styles_secondary__"] > p');
            let district = secondary.innerText.trim().frtFixSpaces();

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
};

window.___frt.Kufar = class {
    observerCallback() {
        window.___frt.Injectors.inject_ban_button_to_listing();

        window.___frt.ListingManipulators.ad_block();
        window.___frt.ListingManipulators.hide_banned();
        window.___frt.ListingManipulators.mark_broken();
        window.___frt.ListingManipulators.highlight_near_districts();
    }

    constructor() {
        setTimeout(() => {
            window.___frt.Injectors.inject_ban_button_on_details_page();

            this.observer = new MutationObserver(this.observerCallback.bind(this));
            const config = { attributes: true, childList: true, subtree: true };
            this.observer.observe(document.body, config);

            this.observerCallback();
        }, 333);
    }
};

window.___frt.kufar = new window.___frt.Kufar();
