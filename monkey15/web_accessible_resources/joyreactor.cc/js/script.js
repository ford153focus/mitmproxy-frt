if (!window.___frt) window.___frt = {};

window.___frt.ReactorUtils = class {
    /**
     * @usage window.___frt.ReactorUtils.rateAllComments('ford153focus', 'minus')
     * @usage window.___frt.ReactorUtils.rateAllComments('ford153focus', 'plus')
     */
    static rateAllComments(target, direction) {
        let userLinks = window._frt.utils.getElementsByXPath(`//a[text()='${target}']`);

        let interval = setInterval(() => {
            let userLink = userLinks.pop();

            if (userLink === undefined) {
                clearInterval(interval);
                return;
            }

            let comment = userLink.parentElement.parentElement.parentElement;

            console.log(comment.querySelector('div[id^="comment_txt_"] > *').innerText); // print to console text of comment
            comment.querySelector(`.vote-${direction}`)?.click();
        }, 333);
    }

    static downVoteAll(target) {
        this.rateAllComments(target, 'minus');
    }

    static upVoteAll(target) {
        this.rateAllComments(target, 'plus');
    }
};

/**
 * fix vertical video height
 */
setTimeout(() => {
    for (let video of  document.getElementsByTagName('video')) {
        if (video.height > video.width) {
            let height = window.innerHeight-150;
            let width =  height * video.width/video.height;

            video.style['min-height'] = `${window.innerHeight-150}px`;
            video.style['max-height'] = `${window.innerHeight-130}px`;

            video.width = width;
            video.height = height;
        }
    }
}, 153);

setInterval(() => {
    window.___frt.ReactorUtils.upVoteAll('yans')
}, 5310);
