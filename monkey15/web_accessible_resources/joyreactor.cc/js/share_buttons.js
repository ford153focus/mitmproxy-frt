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
// @version      2023.3.28
// ==/UserScript==

(() => {
    let tgStandardShareButton = document.createElement('a');
    tgStandardShareButton.classList.add('share_tg');
    tgStandardShareButton.rel = 'nofollow';
    tgStandardShareButton.target = '_blank';
    tgStandardShareButton.style.background = '#ccc url(https://web.telegram.org/img/iphone_home120.png) no-repeat';
    tgStandardShareButton.style.backgroundSize = '38px';
    tgStandardShareButton.style.backgroundPositionX = '-5px';
    tgStandardShareButton.style.backgroundPositionY = '-5px';

    let viberStandardShareButton = document.createElement('a');
    viberStandardShareButton.classList.add('share_viber');
    viberStandardShareButton.rel = 'nofollow';
    viberStandardShareButton.target = '_blank';
    viberStandardShareButton.style.background = '#ccc url(https://www.viber.com/app/themes/viber/assets/images/favicon-v2/android-icon-192x192.png) no-repeat';
    viberStandardShareButton.style.backgroundSize = '28px';
    viberStandardShareButton.style.backgroundPositionX = '0px';
    viberStandardShareButton.style.backgroundPositionY = '0px';

    for (const post of document.querySelectorAll('#post_list .postContainer')) {
        let postLink = post.querySelector('.link_wr > a').href;
        let tgShareLink = `https://t.me/share/url?url=${encodeURIComponent(postLink)}`;
        let viberShareLink = `viber://forward?text=${encodeURIComponent(postLink)}`;

        let tgShareButton = tgStandardShareButton.cloneNode(true);
        tgShareButton.href = tgShareLink;

        let viberShareButton = viberStandardShareButton.cloneNode(true);
        viberShareButton.href = viberShareLink;

        post.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", tgShareButton);
        post.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", viberShareButton);
    }

    if (document.querySelector('.single_post.postContainer') !== null) {
        let tgShareLink = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`;
        let viberShareLink = `viber://forward?text=${encodeURIComponent(window.location.href)}`;

        let tgShareButton = tgStandardShareButton.cloneNode(true);
        tgShareButton.href = tgShareLink;

        let viberShareButton = viberStandardShareButton.cloneNode(true);
        viberShareButton.href = viberShareLink;

        document.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", tgShareButton);
        document.querySelector('.share_buttons > .share_vk').insertAdjacentElement("beforebegin", viberShareButton);
    }
})();
