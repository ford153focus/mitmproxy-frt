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
function showHiddenComments1() {
    let commentShowLinks = [...document.querySelectorAll('a.comment_show')];
    let counter = 0;

    let interval = setInterval(() => {
        if(counter===commentShowLinks.length) {
            clearInterval(interval);
            return;
        }

        commentShowLinks[counter].click();
        counter++;
    }, 531);
}

function showHiddenComments2() {
    let commentShowLinks = [...document.querySelectorAll('.comment .comment-hidden button.ant-btn.ant-btn-link')];
    let counter = 0;

    let interval = setInterval(() => {
        if(counter===commentShowLinks.length) {
            clearInterval(interval);
            return;
        }

        commentShowLinks[counter].click();
        counter++;
    }, 531);
}

setInterval(showHiddenComments1, 3510);
setInterval(showHiddenComments2, 3510);
