if (!window.__frt) window.__frt = {};

window.__frt.c = class {
    ad_block () {
        [...document.querySelectorAll("[class^='styles_banner']")].map(el => el.remove());
        [...document.querySelectorAll("[class^='styles_poleposition']")].map(el => el.remove());
        [...document.querySelectorAll("[class^='styles_bannerContainer']")].map(el => el.remove());
        [...document.querySelectorAll("[class^='styles_recently-viewed']")].map(el => el.remove());
        [...document.querySelectorAll("[alt='placeholder']")].map(el => el.parentElement.parentElement.parentElement.remove());

        document.querySelector('[class^="styles_buttons-right__container"] button')?.click();
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
            alert('забанено');
        };

        wr_button.insertAdjacentElement('afterEnd', clone);
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
            window.t1 = e;
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
        alert('забанено');
    }

    mark_banned() {
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

        for (const el of headings) {
            for (let word of black_list)
            if (el.innerText.toLocaleLowerCase().includes(word)) {
                el.parentElement.parentElement.parentElement.style.backgroundColor = 'red';
            }
        }
    }

    constructor() {
        this.ad_block();

        this.inject_ban_button_on_details_page();
        this.inject_ban_button_to_listing();

        this.mark_banned();
        this.mark_broken();
    }
}

window.__frt.o = new window.__frt.c();
