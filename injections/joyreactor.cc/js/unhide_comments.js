// noinspection JSUnusedGlobalSymbols
function showHiddenCommentsViaFetch() {
    let commentShowLinks = document.querySelectorAll('a.comment_show');
    commentShowLinks = Array.from(commentShowLinks);
    commentShowLinks = commentShowLinks.filter(link => link.style.display!=='none');

    let counter = 0;

    let interval = setInterval(() => {
        if(counter===commentShowLinks.length) {
            clearInterval(interval);
            return;
        }

        let link = commentShowLinks[counter];
        fetch(link.href).then(async (response) => {
            let template = document.createElement( 'span' );
            template.innerHTML = await response.text();
            link.insertAdjacentElement('beforebegin', template);
            link.remove();
        });
        counter++;
    }, 333);

}

// eslint-disable-next-line no-unused-vars
function showHiddenComments() {
    let commentShowLinks = document.querySelectorAll('a.comment_show');
    commentShowLinks = Array.from(commentShowLinks);
    commentShowLinks = commentShowLinks.filter(link => link.style.display!=='none');

    let counter = 0;

    let interval = setInterval(() => {
        if(counter===commentShowLinks.length) {
            clearInterval(interval);
            return;
        }

        commentShowLinks[counter].click();
        commentShowLinks[counter].remove();
        counter++;
    }, 333);
}

setInterval(showHiddenCommentsViaFetch, 5310);
