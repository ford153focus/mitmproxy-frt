window.___frt = class {
    static highLightedCategories = {
        'casino': '#c00',
        'poker': '#c00',
        'slots': '#c00',
        'virtual casino': '#c00',

        'valorant': '#550',
        'league of legends': '#550',

        'just chatting': '#555',

        'counter-strike: global offensive': '#030',
        'dota 2': '#030',
    };

    static highLightedStreamNames = {
        'казино': '#c00',
        'слоты': '#c00',
    };

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
        /** @type {HTMLElement[]} */
        streams = Array.from(streams);
        streams.shift(); //1st element is not stream

        for (const stream of streams) {
            let streamName = stream.querySelector('h3')?.innerText?.toLowerCase();
            let gameName = stream.querySelector('a[data-a-target="preview-card-game-link"]')?.innerText?.toLowerCase();

            if (streamName === undefined) continue;
            if (gameName === undefined) continue;

            for (let [key,value] of Object.entries(this.highLightedStreamNames)) {
                if (streamName.includes(key)) {
                    stream.style.backgroundColor = value;
                }
            }

            for (let [key,value] of Object.entries(this.highLightedCategories)) {
                if (gameName === key) {
                    stream.style.backgroundColor = value;
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
