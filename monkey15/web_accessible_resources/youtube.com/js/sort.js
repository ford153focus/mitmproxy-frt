if (!window.___frt) window.___frt = {};

window.___frt.sortByDuration = () => {
    //noinspection CssInvalidHtmlTagReference
    let items = document.querySelectorAll('ytd-grid-video-renderer');

    [...items]
        .sort((item1, item2) => {
            //noinspection CssInvalidHtmlTagReference
            let t1 = item1.querySelector('ytd-thumbnail-overlay-time-status-renderer').innerText.split(':');
            //noinspection CssInvalidHtmlTagReference
            let t2 = item2.querySelector('ytd-thumbnail-overlay-time-status-renderer').innerText.split(':');

            if (t1.length !== t2.length) {
                return t1.length - t2.length;
            }

            for (let i = 0; i <= t1.length; i++) {
                if (t1[i] !== t2[i]) {
                    return t1[i] - t2[i];
                }
            }

            return 0;
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
};
