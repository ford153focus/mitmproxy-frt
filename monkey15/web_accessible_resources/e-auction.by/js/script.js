if (!window.___frt) window.___frt = {};
window.___frt.Injectors = class {
    static inject_ban_button_on_details_page () {
        let el = document.querySelector('.product-item-detail-buy-button');
        if (!el) return;

        let button = document.createElement("button");

        button.className = 'hide-it';
        button.innerHTML = '❌ Hide';
        button.style.display = 'block';
        button.style.height = '32px';
        button.style.margin = '0 auto';
        button.style.padding = '10px 0 0 0';
        button.style.width = '32px';

        button.onclick = () => {
            window._frt.Bans.add(window.location.pathname);
        };

        el.insertAdjacentElement('afterend', button);
    }

    static inject_ban_button_to_listing () {
        let button = document.createElement("button");
        button.className = 'hide-it';
        button.innerHTML = '❌ Hide';
        button.style.display = 'block';
        button.style.height = '32px';
        button.style.left = '232px';
        button.style.position = 'absolute';
        button.style.top = '-3px';
        button.style.width = '32px';

        let items = document.querySelectorAll('.product-showcase .product-list .product-item');

        for (const el of items) {
            if (el.querySelector('button.hide-it') !== null) continue;
            let clone = button.cloneNode(true);
            clone.onclick = this.listingClickHandler;
            el.querySelector('.items-list--bookmark-icon.icon-heart')?.insertAdjacentElement('afterend', clone);
        }
    }

    /**
     * @param {MouseEvent} event
     */
    static listingClickHandler(event) {
        event.preventDefault();
        let href = event.target.parentElement.parentElement.parentElement.href;
        window._frt.Bans.add(href);
        window.___frt.ListingManipulators.hide_banned();
    }
};

window.___frt.ListingManipulators = class {
    static hide_banned() {
        setInterval(() => {
            let bans = window._frt.Bans.get();
            let items = document.querySelectorAll('.product-showcase .product-list .product-item');

            for (const el of items) {
                let href = el?.href;
                if (!href) continue;
                if (bans.includes(href)) el.style.display = 'none';
            }
        }, 1530);
    }
};

window.___frt.EAuctionBy = class {
    observerCallback() {
        window.___frt.Injectors.inject_ban_button_to_listing();
        window.___frt.ListingManipulators.hide_banned();
    }

    constructor() {
        // return;
        // noinspection UnreachableCodeJS
        setTimeout(() => {
            window.___frt.Injectors.inject_ban_button_on_details_page();

            this.observer = new MutationObserver(this.observerCallback.bind(this));
            const config = { attributes: true, childList: true, subtree: true };
            this.observer.observe(document.body, config);

            this.observerCallback();
        }, 153);
    }
};

window.___frt.eAuctionBy = new window.___frt.EAuctionBy();
