// noinspection JSUnusedGlobalSymbols

class ReactorUtils {
    /**
     * @usage window.___frt.jr.utils.rateAllComments('ford153focus', 'minus')
     * @usage window.___frt.jr.utils.rateAllComments('ford153focus', 'plus')
     */
    rateAllComments(target, direction) {
        /** @var {NodeList} comments */
        let comments = document.querySelectorAll('div[id^="comment_txt_"]'); // all comments on page

        // get comments of target
        /** @var {HTMLElement[]} targetComments */
        let targetComments = Array.from(comments).filter((comment) => {
            return comment.querySelector('a[href^="/user/"]')?.innerText === target;
        });

        let i = 0;

        let interval1 = setInterval(() => {
            console.log(targetComments[i].querySelector('div[id^="comment_txt_"] > *').innerText); // print to console text of comment
            targetComments[i].querySelector(`.vote-${direction}`)?.click();
            i++; // bump counter
            if (i === targetComments.length) clearInterval(interval1); // if it was last comment - exit from cycle
        }, 1234);
    }
}

if (!window.___frt) window.___frt = new ReactorUtils();
