if (!window.___frt) window.___frt = {};

window.___frt.HiddenCommentsUtils = class {
    counter = 0;
    in_progress = [];
    selectors = [
        'a.comment_show', //desktop
        '.comment .comment-hidden button.ant-btn.ant-btn-link', //mobile
    ];

    // noinspection JSUnusedGlobalSymbols
    via_click(el, delay) {
        setTimeout(() => {
            el.click();
            el.remove();
        }, delay);
    }

    via_fetch(el, delay) {
        setTimeout(() => {
            fetch(el.href).then(async (response) => {
                let template = document.createElement('span');
                template.innerHTML = await response.text();
                el.insertAdjacentElement('beforebegin', template);
                el.remove();
            });
        }, delay);
    }

    callback () {
        for (const selector of this.selectors) {
            for (const el of document.querySelectorAll(selector)) {
                if (this.in_progress.includes(el.href)) continue;

                this.in_progress.push(el.href);
                this.counter++;

                let delay = 333*this.counter;

                // this.via_click(el, delay);
                this.via_fetch(el, delay);
            }
        }
    }

    constructor() {
        setInterval(this.callback.bind(this), 1530);
    }
};

window.___frt.hiddenCommentsUtils = new window.___frt.HiddenCommentsUtils();
