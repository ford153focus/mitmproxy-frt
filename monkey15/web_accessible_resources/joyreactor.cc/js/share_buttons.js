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
// @version      2023.3.29
// ==/UserScript==

(() => {
    /** @type {HTMLAnchorElement} Reference of Telegram share button */
    let tgStandardShareButton = document.createElement('a');
    tgStandardShareButton.classList.add('share_tg');
    tgStandardShareButton.rel = 'nofollow';
    tgStandardShareButton.style.backgroundColor = '#ccc';
    tgStandardShareButton.style.backgroundImage = 'url(https://web.telegram.org/img/iphone_home120.png)';
    tgStandardShareButton.style.backgroundPositionX = '-5px';
    tgStandardShareButton.style.backgroundPositionY = '-5px';
    tgStandardShareButton.style.backgroundRepeat = 'no-repeat';
    tgStandardShareButton.style.backgroundSize = '38px';
    tgStandardShareButton.target = '_blank';

    /** @type {HTMLAnchorElement} Reference of Viber share button */
    let viberStandardShareButton = document.createElement('a');
    viberStandardShareButton.classList.add('share_viber');
    viberStandardShareButton.rel = 'nofollow';
    viberStandardShareButton.style.backgroundColor = '#ccc';
    viberStandardShareButton.style.backgroundImage = 'url(https://www.viber.com/app/themes/viber/assets/images/favicon-v2/android-icon-192x192.png)';
    viberStandardShareButton.style.backgroundPositionX = '0';
    viberStandardShareButton.style.backgroundPositionY = '0';
    viberStandardShareButton.style.backgroundRepeat = 'no-repeat';
    viberStandardShareButton.style.backgroundSize = '28px';
    viberStandardShareButton.target = '_blank';

    /* On listing page iterate posts and inject copy of reference buttons */
    for (const post of document.querySelectorAll('#post_list .postContainer')) {
        /** @type {string} Direct link to post */
        let postLink = post.querySelector('.link_wr > a').href;

        /** @type {HTMLAnchorElement} Copy of reference Tg button */
        let tgShareButton = tgStandardShareButton.cloneNode(true);
        tgShareButton.href = `https://t.me/share/url?url=${encodeURIComponent(postLink)}`;
        post.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", tgShareButton);

        /** @type {HTMLAnchorElement} Copy of reference Viber button */
        let viberShareButton = viberStandardShareButton.cloneNode(true);
        viberShareButton.href = `viber://forward?text=${encodeURIComponent(postLink)}`;
        post.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", viberShareButton);
    }

    /* Path for single post page */
    if (document.querySelector('.single_post.postContainer') !== null) {
        /** @type {HTMLAnchorElement} Copy of reference Tg button */
        let tgShareButton = tgStandardShareButton.cloneNode(true);
        tgShareButton.href = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`;
        document.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", tgShareButton);

        /** @type {HTMLAnchorElement} Copy of reference Viber button */
        let viberShareButton = viberStandardShareButton.cloneNode(true);
        viberShareButton.href = `viber://forward?text=${encodeURIComponent(window.location.href)}`;
        document.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", viberShareButton);
    }
})();
