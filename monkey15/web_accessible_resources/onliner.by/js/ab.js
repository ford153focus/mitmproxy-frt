// noinspection DuplicatedCode

if (!window.___frt) window.___frt = {};

window.___frt.Bans = class {
    /**
     * @returns {string[]}
     */
    static get () {
        try {
            return JSON.parse(localStorage.bans)
          } catch (exception) {
            return [];
        }
    }

    /**
     * @param {string[]} bans
     */
    static set (bans) {
        let set = new Set(bans);
        let array = Array.from(set);
        localStorage.bans = JSON.stringify(array);
    }

    /**
     * @param {string} path
     */
    static add (path) {
        let bans = window.___frt.Bans.get();
        bans.push(path);
        this.set(bans);
        window._frt.utils.notify('забанено');
    }
};

window.___frt.Injectors = class {
    static inject_ban_button_on_details_page () {
        let buttons=[...document.querySelectorAll('button')];
        let wr_button = buttons.filter(el => el.innerText === 'Написать').shift();
        if (wr_button === undefined) return;
        let clone = wr_button.cloneNode(true);
        clone.innerHTML='Забанить';
        clone.style.backgroundColor = 'red';

        clone.onclick = () => {
            window.___frt.Bans.add(window.location.pathname);
        };

        wr_button.insertAdjacentElement('afterend', clone);
    }

    static inject_ban_button_to_listing () {
        let button = document.createElement("button");
        button.className = 'hide-it';
        button.innerHTML = '❌ Hide';
        button.style.margin = '30px 0 0 320px';
        button.style.display = 'block';

        let click = (e) => {
            e.preventDefault();
            let href = e.target.parentElement.parentElement.href;
            window.___frt.Bans.add(href);
            window.___frt.ListingManipulators.hide_banned();
        }

        for (const el of document.querySelectorAll('.vehicle-form__offers-unit')) {
            if (el.querySelector('button.hide-it') !== null) continue;
            let clone = button.cloneNode(true);
            clone.onclick = click;
            el.querySelector('.vehicle-form__offers-item').insertAdjacentElement('beforeend', clone);
        }
    }

};

window.___frt.ListingManipulators = class {
    static hide_banned() {
        setInterval(() => {
            let bans = window.___frt.Bans.get();

            for (const el of document.querySelectorAll('.vehicle-form__offers-unit')) {
                let href = el?.href;
                if (!href) continue;
                if (bans.includes(href)) el.style.display = 'none';
            }
        }, 5555);
    }
};

window.___frt.Onliner = class {
    observerCallback() {
        window.___frt.Injectors.inject_ban_button_to_listing();
        window.___frt.ListingManipulators.hide_banned();
    }

    constructor() {
        setTimeout(() => {
            // window.___frt.Injectors.inject_ban_button_on_details_page();

            this.observer = new MutationObserver(this.observerCallback.bind(this));
            const config = { attributes: true, childList: true, subtree: true };
            this.observer.observe(document.body, config);

            this.observerCallback();
        }, 333);
    }
};

window.___frt.onliner = new window.___frt.Onliner();
