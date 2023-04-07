// ==UserScript==
// @author       ford153focus
// @description  JoyReactor: add rate buttons for highlighted commentaries
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=joyreactor.cc
// @match        https://joyreactor.cc/*
// @name         ReactorRateHighlightedComments
// @namespace    frt
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/ford153focus/mitmproxy-frt/master/monkey15/web_accessible_resources/joyreactor.cc/js/rate_highlighted.js
// @version      2023.3.29
// ==/UserScript==

setTimeout(() => {
    /** @type {HTMLSpanElement} */
    let referenceUpVoteButton = document.createElement('span');
    referenceUpVoteButton.classList.add('frt-vote-plus');
    referenceUpVoteButton.dataset['cid'] = '0';
    referenceUpVoteButton.dataset['vote'] = 'plus';
    referenceUpVoteButton.innerHTML = '👍&nbsp;&nbsp;';
    referenceUpVoteButton.style.cursor = 'pointer';
    referenceUpVoteButton.title = 'Vote Up';

    /** @type {HTMLSpanElement} */
    let referenceDownVoteButton = document.createElement('span');
    referenceDownVoteButton.classList.add('frt-vote-minus');
    referenceDownVoteButton.dataset['cid'] = '0';
    referenceDownVoteButton.dataset['vote'] = 'down';
    referenceDownVoteButton.innerHTML = '&nbsp;&nbsp;👎';
    referenceDownVoteButton.style.cursor = 'pointer';
    referenceDownVoteButton.title = 'Vote Down';

    for (const h3tag of document.getElementsByTagName('h3')) {
        if (h3tag.innerText !== 'Отличный комментарий!') continue;

        for (const comment of h3tag.parentNode.parentNode.querySelectorAll('div.comment.hightlighted.filled')) {
            let commentId = [...comment.id.matchAll(/^best_comment_(\d+)_(\d+)$/g)][0][2];

            const upVoteButton = referenceUpVoteButton.cloneNode(true);
            const downVoteButton = referenceDownVoteButton.cloneNode(true);

            upVoteButton.dataset['cid'] = commentId;
            downVoteButton.dataset['cid'] = commentId;

            upVoteButton.addEventListener('click', (event) => {
                let url = `/comment_vote/add/${event.target.dataset.cid}/${event.target.dataset.vote}?token=${window.token}`;
                let promise = fetch(url);
                promise.then(async function (response) {
                    event.target.parentElement.innerHTML = await response.text();
                });
            });

            downVoteButton.addEventListener('click', (event) => {
                let url = `/comment_vote/add/${event.target.dataset.cid}/${event.target.dataset.vote}?token=${window.token}`;
                let promise = fetch(url);
                promise.then(async function (response) {
                    event.target.parentElement.innerHTML = await response.text();
                });
            });

            /** @type {HTMLDivElement} */
            const ratingTag = comment.querySelector('.post_rating');
            ratingTag.insertAdjacentElement('afterbegin', upVoteButton);
            ratingTag.insertAdjacentElement('beforeend', downVoteButton);
        }
    }
}, 153);
