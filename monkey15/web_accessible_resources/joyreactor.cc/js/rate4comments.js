class BestCommentVoter {
    /**
     * Get styles of original vote buttons
     * and apply them to own custom vote buttons
     */
    static applyStyles() {
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
    }

    static drawButtons() {
        let voteUpTag = '<span class="c-vote-plus" title="vote up" data-vote="plus" onclick="BestCommentVoter.vote(this)"></span>';
        let voteDownTag = '<span class="c-vote-minus" title="vote down" data-vote="minus" onclick="BestCommentVoter.vote(this)"></span>';

        for (const h3tag of document.getElementsByTagName('h3')) {
            if (h3tag.innerText !== 'Отличный комментарий!') continue;

            let highlightedComments = h3tag.parentNode.parentNode.querySelectorAll('div.comment.hightlighted.filled');

            for (let comment of highlightedComments) {
                const ratingTag = comment.getElementsByClassName('post_rating')[0];
                ratingTag.insertAdjacentHTML('afterbegin', voteUpTag);
                ratingTag.insertAdjacentHTML('beforeend', voteDownTag);
            }
        }
    }

    static vote(span) {
        let commentId = span.parentNode.parentNode.querySelector('.comment_link').href.match(/\d+$/g);
        let voteDirection = span.attributes['data-vote'].value;

        fetch(`/comment_vote/add/${commentId}/${voteDirection}?token=${window.token}`)
            .then(async function (response) {
                span.parentElement.innerHTML = await response.text();
            });
    }
}

setTimeout(() => {
    BestCommentVoter.drawButtons();
    BestCommentVoter.applyStyles();
}, 4444);
