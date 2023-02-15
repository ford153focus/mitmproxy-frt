if (!window.___frt) window.___frt = {};

window.___frt.HiddenCommentsUtils = class {
    static selectors = {
        'desktop' : 'a.comment_show',
        'mobile'  : '.comment .comment-hidden button.ant-btn.ant-btn-link',
    }

    static use_click = false;
    static use_fetch = true;

    static callback () {
        let selectors = Object.values(this.selectors);

        for (let selector of selectors) {
            let counter = 1;

            for (const el of document.querySelectorAll(selector)) {
                let delay = 531*counter;

                if (this.use_click) {
                    setTimeout(() => { 
                        el.click(); 
                        el.remove();
                    }, delay);
                }

                if (this.use_fetch) {
                    setTimeout(() => {
                        fetch(el.href).then(async (response) => {
                            let template = document.createElement('span');
                            template.innerHTML = await response.text();
                            el.insertAdjacentElement('beforebegin', template);
                            el.remove();
                        });
                    }, delay);
                }

                counter++;
            }
        }
    }
};

(() => {
    let observerCallback = window.___frt.HiddenCommentsUtils.callback.bind(window.___frt.HiddenCommentsUtils);
    let observer = new MutationObserver(observerCallback);
    let config = { attributes: true, childList: true, subtree: true };
    observer.observe(document.body, config);
})()
