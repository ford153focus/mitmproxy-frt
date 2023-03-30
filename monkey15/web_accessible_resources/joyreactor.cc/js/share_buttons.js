// ==UserScript==
// @author       ford153focus
// @description  JoyReactor: add share buttons for telegram and viber
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=joyreactor.cc
// @match        https://joyreactor.cc/*
// @name         ReactorNewShareButtons
// @namespace    frt
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/ford153focus/mitmproxy-frt/master/monkey15/web_accessible_resources/joyreactor.cc/js/share_buttons.js
// @version      2023.3.30
// ==/UserScript==

setTimeout(() => {
    /** @type {HTMLAnchorElement} Reference of Telegram share button */
    let referenceTgShareButton = document.createElement('a');
    referenceTgShareButton.classList.add('share_tg');
    referenceTgShareButton.rel = 'nofollow';
    referenceTgShareButton.style.backgroundColor = '#ccc';
    referenceTgShareButton.style.backgroundImage = 'url(https://web.telegram.org/img/iphone_home120.png)';
    referenceTgShareButton.style.backgroundPositionX = '-5px';
    referenceTgShareButton.style.backgroundPositionY = '-5px';
    referenceTgShareButton.style.backgroundRepeat = 'no-repeat';
    referenceTgShareButton.style.backgroundSize = '38px';
    referenceTgShareButton.target = '_blank';

    /** @type {HTMLAnchorElement} Reference of Viber share button */
    let referenceViberShareButton = document.createElement('a');
    referenceViberShareButton.classList.add('share_viber');
    referenceViberShareButton.rel = 'nofollow';
    referenceViberShareButton.style.backgroundColor = '#ccc';
    referenceViberShareButton.style.backgroundImage = 'url(https://www.viber.com/app/themes/viber/assets/images/favicon-v2/android-icon-192x192.png)';
    referenceViberShareButton.style.backgroundPositionX = '0';
    referenceViberShareButton.style.backgroundPositionY = '0';
    referenceViberShareButton.style.backgroundRepeat = 'no-repeat';
    referenceViberShareButton.style.backgroundSize = '28px';
    referenceViberShareButton.target = '_blank';

    /* On listing page iterate posts and inject copy of reference buttons */
    for (const post of document.querySelectorAll('#post_list .postContainer')) {
        /** @type {string} Direct link to post */
        let postLink = post.querySelector('.link_wr > a').href;

        /** @type {HTMLAnchorElement} Copy of reference Tg button */
        let tgShareButton = referenceTgShareButton.cloneNode(true);
        tgShareButton.href = `https://t.me/share/url?url=${encodeURIComponent(postLink)}`;
        post.querySelector('.share_buttons > .share_vk').insertAdjacentElement('beforebegin', tgShareButton);

        /** @type {HTMLAnchorElement} Copy of reference Viber button */
        let viberShareButton = referenceViberShareButton.cloneNode(true);
        viberShareButton.href = `viber://forward?text=${encodeURIComponent(postLink)}`;
        post.querySelector('.share_buttons > .share_vk').insertAdjacentElement('beforebegin', viberShareButton);
    }

    /* Path for single post page */
    if (document.querySelector('.single_post.postContainer') !== null) {
        /** @type {HTMLAnchorElement} Copy of reference Tg button */
        let tgShareButton = referenceTgShareButton.cloneNode(true);
        tgShareButton.href = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`;
        document.querySelector('.share_buttons > .share_vk').insertAdjacentElement('beforebegin', tgShareButton);

        /** @type {HTMLAnchorElement} Copy of reference Viber button */
        let viberShareButton = referenceViberShareButton.cloneNode(true);
        viberShareButton.href = `viber://forward?text=${encodeURIComponent(window.location.href)}`;
        document.querySelector('.share_buttons > .share_vk').insertAdjacentElement('beforebegin', viberShareButton);
    }
}, 153);
