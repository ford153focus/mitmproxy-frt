if (!window.___frt) window.___frt = {};
window.counter = 1;
window.in_progress = [];

window.___frt.HiddenCommentsUtils = class {
    static selectors = {
        'desktop' : 'a.comment_show',
        'mobile'  : '.comment .comment-hidden button.ant-btn.ant-btn-link',
    };

    static via_click(el, delay) {
        setTimeout(() => {
            el.click();
            el.remove();
        }, delay);
    }

    static via_fetch(el, delay) {
        setTimeout(() => {
            fetch(el.href).then(async (response) => {
                let template = document.createElement('span');
                template.innerHTML = await response.text();
                el.insertAdjacentElement('beforebegin', template);
                el.remove();
            });
        }, delay);
    }

    static callback () {
        let values = Object.values(this.selectors);

        for (let selector of values) {
            for (const el of document.querySelectorAll(selector)) {
                let delay = 333*window.counter;

                if (window.in_progress.includes(el.href)) continue;
                window.in_progress.push(el.href);

                // this.via_click(el, delay);
                this.via_fetch(el, delay);

                window.counter++;
            }
        }
    }
};

(() => {
    let observerCallback = window.___frt.HiddenCommentsUtils.callback.bind(window.___frt.HiddenCommentsUtils);
    let observer = new MutationObserver(observerCallback);
    let config = { attributes: true, childList: true, subtree: true };
    observer.observe(document.body, config);
})();
