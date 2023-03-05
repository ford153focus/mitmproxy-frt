// noinspection UnusedCatchParameterJS

if (!window.___frt) window.___frt = {};

window.___frt.PlayShortcut = class {
    /** @member {HTMLElement} */
    post;

    play() {
        /** GIF */
        try {
            this.post
                .querySelector('video')
                .play()
                .then(r => console.info(r));

            this.post
                .setAttribute('data-playing', 'true');
        } catch (error) {
            // ignored
        }

        /** COUB */
        try {
            this.post
                .querySelector('iframe')
                .contentWindow.postMessage('play', '*');

            this.post
                .setAttribute('data-playing', 'true');
        } catch (error) {
            // ignored
        }

        /** YT */
        try {
            let frame = this.post.querySelector('iframe.youtube-player');

            frame
                .contentWindow
                .postMessage(
                    JSON.stringify({ event: 'command', func: 'playVideo' }),
                    'https://www.youtube.com'
                );

            frame.contentWindow
                .postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo' }),
                'https://www.youtube.com'
            );

            this.post
                .setAttribute('data-playing', 'true');
        } catch (error) {
            // ignored
        }
    }

    stop() {
        /** GIF */
        try {
            this.post.querySelector('video').pause();
            this.post.setAttribute('data-playing', 'false');
        } catch (error) {
            // ignored
        }

        /** COUB */
        try {
            this.post.querySelector('iframe').contentWindow.postMessage('stop', '*');
            this.post.setAttribute('data-playing', 'false');
        } catch (error) {
            // ignored
        }

        /** YT */
        try {
            let frame = this.post.querySelector('iframe.youtube-player');
            frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), 'https://www.youtube.com');
            frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), 'https://www.youtube.com');
            this.post.setAttribute('data-playing', 'false');
        } catch (error) {
            // ignored
        }
    }

    keyPressListener(event) {
        if (event.code !== 'KeyP') return;
        this.post = document.querySelector('.postContainer .article.post-normal.active');
        let status = this.post.getAttribute('data-playing');
        status === 'false' ? this.play() : this.stop();
    }

    constructor() {
        window._frt.Injectors.injectScript({src: 'https://www.youtube.com/iframe_api'});

        /** Catch all key presses */
        document.onkeyup = this.keyPressListener;

        /** enable js api in YT players */
        for (const yt of document.querySelectorAll('.youtube-player')) {
            yt.src += '&enablejsapi=1';
        }

        /** starting value */
        for (const post of document.querySelectorAll('.postContainer .article.post-normal')) {
            post.setAttribute('data-playing', 'false');
        }
    }
}

window.___frt.playShortcut = new window.___frt.PlayShortcut();
