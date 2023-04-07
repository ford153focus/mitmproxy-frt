// noinspection DuplicatedCode

if (!window.___frt) window.___frt = {};

window.___frt.Injectors = class {
    static inject_ban_button_on_details_page () {
        //not implemented
    }

    static inject_ban_button_to_listing () {
        let button = document.createElement('button');
        button.className = 'hide-it';
        button.innerHTML = '❌ Hide';
        button.style.margin = '30px 0 0 320px';
        button.style.display = 'block';

        for (const el of document.querySelectorAll('.vehicle-form__offers-unit')) {
            if (el.querySelector('button.hide-it') !== null) continue;
            let clone = button.cloneNode(true);
            clone.onclick = this.listingClickHandler;
            el.querySelector('.vehicle-form__offers-item').insertAdjacentElement('beforeend', clone);
        }
    }

    /**
     * @param {MouseEvent} event
     */
    static listingClickHandler(event) {
        event.preventDefault();
        let href = event.target.parentElement.parentElement.href;
        window._frt.Bans.add(href);
        window.___frt.ListingManipulators.hide_banned();
    }
};

window.___frt.ListingManipulators = class {
    static hide_banned() {
        setInterval(() => {
            let bans = window._frt.Bans.get();

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
