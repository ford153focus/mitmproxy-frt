class LorTopicUtils {
    async getRandomTopic() {
        /** Pick random topic and go to it */
        let topics = await window._frt.lor.shared.getFilteredTopicsInTracker();
        let randomTopicNumber = Math.floor(Math.random() * topics.length);
        return topics[randomTopicNumber];
    }

    /**
     * Draw buttons in title
     */
    async drawButtons() {
        /** Get title tag */
        let h1 = document.querySelector('h1[itemprop="headline"]');
        if (h1 === null) return;

        /** Get buttons block */
        let favButtons = document.querySelector('div.fav-buttons');
        if (favButtons === null) return;

        /** Inject buttons markup */
        await window._frt.injectMarkupFileFromExtension('/web_accessible_resources/linux.org.ru/html/topic_title_buttons.html', h1, 'afterbegin');
        await window._frt.injectMarkupFileFromExtension('/web_accessible_resources/linux.org.ru/html/topic_side_buttons.html', favButtons, 'beforeend');

        /** Set handlers */
        document.getElementById('ban-link').onclick = () => window._frt.lor.topic.buttonsHandler(0, 1);
        document.querySelector('button[name="hide"]').onclick = () => window._frt.lor.topic.buttonsHandler(1, 1);
        document.querySelector('button[name="next"]').onclick = () => window._frt.lor.topic.buttonsHandler(1, 0);
    }

    async buttonsHandler(goNext, banCurrent) {
        if (banCurrent) await window._frt.lor.shared.saveBan(window.location.pathname);
        window.location.href = goNext ? await this.getRandomTopic() : 'https://www.linux.org.ru/tracker/';
    }

    constructor() {
        this.drawButtons();
        window._frt.loadFontAwesome();
    }
}

setTimeout(() => {
    if (typeof window._frt.lor === 'undefined') window._frt.lor = {};
    window._frt.lor.topic = new LorTopicUtils();
}, 5);
