/**
 * Async vote function
 * @param {HTMLSpanElement} span Vote button, HTML Element
 * @returns {Promise<void>} Empty promise
 */
async function frtVote(span) {
    let commentId = span.parentNode.parentNode.querySelector('.comment_link').href.match(/\d+$/g);
    let voteDirection = span.attributes['data-vote'].value;

    fetch(`/comment_vote/add/${commentId}/${voteDirection}?token=${window.token}`)
        .then(async function (response) {
            span.parentElement.innerHTML = await response.text();
        });
}

/**
 * Draw buttons
 */
(() => {
    let voteUpTag = '<span class="c-vote-plus" title="vote up" data-vote="plus" onclick="frtVote(this)"></span>';
    let voteDownTag = '<span class="c-vote-minus" title="vote down" data-vote="minus" onclick="frtVote(this)"></span>';

    let h3tags = document.getElementsByTagName('h3');
    h3tags = Array.from(h3tags);
    h3tags = h3tags.filter(header => header.innerText === 'Отличный комментарий!');

    for (let h3 of h3tags) {
        let highlightedComments = h3.parentNode.parentNode.querySelectorAll('div.comment.hightlighted.filled');

        for (let comment of highlightedComments) {
            const ratingTag = comment.getElementsByClassName('post_rating')[0];
            ratingTag.insertAdjacentHTML('afterbegin', voteUpTag);
            ratingTag.insertAdjacentHTML('beforeend', voteDownTag);
        }
    }
})();

/**
 * Get styles of original vote buttons
 * and apply them to own custom vote buttons
 */
(() => {
    let originalPlusButton = document.querySelector('div.vote-plus');
    let originalMinusButton = document.querySelector('div.vote-minus');

    if (originalPlusButton === null) return;
    if (originalMinusButton === null) return;

    let originalPlusStyles = window.getComputedStyle(originalPlusButton);
    let originalMinusStyles = window.getComputedStyle(originalMinusButton);

    let customPlusButtons = document.querySelectorAll('span.c-vote-plus');
    let customMinusButtons = document.querySelectorAll('span.c-vote-minus');

    for (let cButton of customPlusButtons)
        for (let style of originalPlusStyles)
            cButton.style[style] = originalPlusStyles[style];


    for (let cButton of customMinusButtons)
        for (let style of originalMinusStyles)
            cButton.style[style] = originalMinusStyles[style];
})();
