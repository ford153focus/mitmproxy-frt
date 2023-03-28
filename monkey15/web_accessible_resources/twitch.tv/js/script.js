window.___frt = class {
    static adBlock() {
        window._frt.utils.removeAllBySelector('div[id^="dfp-directory-"]');
    }

    static bonusHunter() {
        document.querySelector('button[aria-label="Claim Bonus"]')?.click();
        document.querySelector('button[aria-label="Получить бонус"]')?.click();

        // eslint-disable-next-line quotes
        let xPathQuery = "//*[text()='Claim']";
        let xPathResult = document.evaluate( xPathQuery, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
        let xPathNode = xPathResult.iterateNext();
        if (xPathNode !== null) xPathNode.click();
    }

    static streamsFilter() {
        let streams = document.querySelectorAll('div.tw-tower > div');
        /** @type {HTMLElement[]} */
        streams = Array.from(streams);
        streams.shift(); //1st element is not stream

        for (const stream of streams) {
            let streamName = stream.querySelector('h3')?.innerText?.toLowerCase();
            let gameName = stream.querySelector('a[data-a-target="preview-card-game-link"]')?.innerText?.toLowerCase();

            if (streamName === undefined) continue;
            if (gameName === undefined) continue;

            /* eslint-disable indent */
            switch (true) {
                case streamName.includes('казино'):
                    stream.style.backgroundColor = '#c00';
                    break;
                case streamName.includes('слоты'):
                    stream.style.backgroundColor = '#c00';
                    break;
            }

            switch (gameName) {
                case 'casino':
                case 'poker':
                case 'slots':
                case 'virtual casino':
                    stream.style.backgroundColor = '#c00';
                    break;
                case 'valorant':
                case 'league of legends':
                    stream.style.backgroundColor = '#550';
                    break;
                case 'just chatting':
                    stream.style.backgroundColor = '#555';
                    break;
                case 'counter-strike: global offensive':
                case 'counter-strike 2':
                case 'dota 2':
                    stream.style.backgroundColor = '#030';
                    break;
            }
            /* eslint-enable indent */
        }
    }
};

setInterval(() => {
    if (window.location.pathname.startsWith('/directory')) {
        window.___frt.streamsFilter();
    } else {
        window.___frt.bonusHunter();
    }
    window.___frt.adBlock();
}, 3510);
