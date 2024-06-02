/**
 * mark current page as viewed
 */
setTimeout(async () => {
    let item_id = document.querySelector('div.container[itemtype="http://schema.org/Article"]')?.getAttribute('itemid');

    let viewed = await window._frt.Fetchers.fetch(`http://192.168.1.44:7965/monkey15/4pda/article/is-viewed/${item_id}/`, true);

    if (viewed.status === true) {
        document.querySelector('h1').style.backgroundColor = '#911';
    }

    await window._frt.Fetchers.fetch(`http://192.168.1.44:7965/monkey15/4pda/article/set-viewed/${item_id}/1/`, true);
}, 333);

/**
 * mark recommendations
 */
setTimeout(async () => {
    for (let article of document.querySelectorAll('article.post[itemtype="http://schema.org/Article"]')) {
        let article_id = article.getAttribute('itemid');
        if (!article_id) continue;

        let viewed = await window._frt.Fetchers.fetch(`http://192.168.1.44:7965/monkey15/4pda/article/is-viewed/${article_id}/`, true);

        if (viewed.status === true) {
            article.style.backgroundColor = '#911';
        }
    }
}, 333);

/**
 * inject button and events
 */
setTimeout(async () => {
    let ref_hide_button = document.createElement('button');
    ref_hide_button.style.position = 'absolute';
    ref_hide_button.innerText = 'hide it';

    let ref_hide_button_click_listener = async (event) => {
        let article_elem = event.target.parentElement;
        let itemid = article_elem.getAttribute('itemid');
        let url = `http://192.168.1.44:7965/monkey15/4pda/article/set-viewed/${itemid}/3/`;
        await window._frt.Fetchers.fetch(url, true);
        article_elem.style.backgroundColor = '#911';
    };

    let ref_hide_button_click2_listener = async (event) => {
        window.t1 = event;
        if (window.t1.button !== 1) return;
        let article_elem = event.target;
        while (article_elem.tagName !== 'ARTICLE') {article_elem = article_elem.parentElement;}
        let itemid = article_elem.getAttribute('itemid');
        let url = `http://192.168.1.44:7965/monkey15/4pda/article/set-viewed/${itemid}/2/`;
        await window._frt.Fetchers.fetch(url, true);
        article_elem.style.backgroundColor = '#911';
    };

    for (let article of document.querySelectorAll('article.post[itemtype="http://schema.org/Article"]')) {
        let hide_button = ref_hide_button.cloneNode(true);
        hide_button.addEventListener('click', ref_hide_button_click_listener);
        article.insertAdjacentElement('beforeend', hide_button);
        article.addEventListener('mousedown', ref_hide_button_click2_listener);
    }
}, 333);
