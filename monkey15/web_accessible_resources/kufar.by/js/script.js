if (!window.___frt) window.___frt = {};

window.___frt.Kufar = class {
    ad_block () {
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

    inject_ban_button_on_details_page () {
        let buttons=[...document.querySelectorAll('button')];
        let wr_button = buttons.filter(el => el.innerText === 'Написать').shift();
        if (wr_button === undefined) return;
        let clone = wr_button.cloneNode(true);
        clone.innerHTML='Забанить';
        clone.style.backgroundColor = 'red';

        clone.onclick = () => {
            this.add_ban(window.location.pathname);
        };

        wr_button.insertAdjacentElement('afterend', clone);
    }

    inject_ban_button_to_listing () {
        let button = document.createElement("button");
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
            this.add_ban(path);
        }

        for (const el of document.querySelectorAll('[class^="styles_cards"] section [class^="styles_content"]')) {
            let clone = button.cloneNode(true);
            clone.onclick = click;
            el.insertAdjacentElement('beforeend', clone);
        }
    }

    get_bans () {
        try {
            return JSON.parse(localStorage.bans)
          } catch (exception) {
            return [];
        }
    }

    set_bans (bans) {
        let set = new Set(bans);
        let array = Array.from(set);
        localStorage.bans = JSON.stringify(array);
    }

    add_ban (path) {
        let bans = this.get_bans();
        bans.push(path);
        this.set_bans(bans);
        window._frt.utils.notify('забанено');
    }

    hide_banned() {
        setInterval(() => {
            let bans = this.get_bans();

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

    mark_broken() {
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

    constructor() {
        setTimeout(() => {
            this.ad_block();

            this.inject_ban_button_on_details_page();
            this.inject_ban_button_to_listing();

            this.hide_banned();
            this.mark_broken();
        }, 333);
    }
}

window.___frt.kufar = new window.___frt.Kufar();
