if (!window.___frt) window.___frt = {};

window.___frt.ReactorUtils = class {
    /**
     * @usage window.___frt.ReactorUtils.rateAllComments('ford153focus', 'minus')
     * @usage window.___frt.ReactorUtils.rateAllComments('ford153focus', 'plus')
     */
    static rateAllComments(target, direction) {
        let i = 1;
        const comments = document.querySelectorAll('div[id^="comment_txt_"]');
        for (const comment of comments) {
            if (comment.querySelector('a[href^="/user/"]')?.innerText !== target) continue; // check username
            setTimeout(() => {
                console.log(comment.querySelector('div[id^="comment_txt_"] > *').innerText); // print to console text of comment
                comment.querySelector(`.vote-${direction}`)?.click();
            }, 333*i); // delayed voting to avoid ddos protection trigger
            i++;
        }
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
