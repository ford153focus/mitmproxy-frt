window.___frt = class {
    static unwantedCats = [
        'casino',
        'just chatting',
        'poker',
        'slots',
        'virtual casino',
        'valorant',
        'league of legends'
    ];

    static unwantedStreamNames = [
        'казино',
        'слоты'
    ];

    static adBlock() {
        window._frt.removeSelectorAll('div[id^="dfp-directory-"]');
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
        streams = Array.from(streams);
        streams.shift(); //1st element is not stream

        for (const stream of streams) {
            let streamName = stream.querySelector('h3')?.innerText?.toLowerCase();
            let gameName = stream.querySelector('a[data-a-target="preview-card-game-link"]')?.innerText?.toLowerCase();

            if (streamName === undefined) continue;
            if (gameName === undefined) continue;

            if (this.unwantedCats.includes(gameName)) stream.remove();

            for (const unwantedStreamName of this.unwantedStreamNames) {
                if (streamName.includes(unwantedStreamName)) {
                    stream.remove();
                }
            }
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
