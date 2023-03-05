/* eslint-disable brace-style */

// noinspection JSUnusedGlobalSymbols

class LorSharedUtils {
    /**
     * Clean old bans
     * @returns {void}
     */
    async cleanUpOldTopicsBans() {
        let hiddenTopics = localStorage.getItem('hidden_topics');
        if (hiddenTopics===null) return;

        let obsoletionDate = new Date();
        obsoletionDate.setMonth(obsoletionDate.getMonth() - 6);
        obsoletionDate = obsoletionDate.getTime() / 1000;
        obsoletionDate = parseInt(obsoletionDate.toString()).toFixed(0);


        hiddenTopics = JSON.parse(hiddenTopics);
        hiddenTopics = hiddenTopics.filter(topic => topic.date > obsoletionDate);
        hiddenTopics = JSON.stringify(hiddenTopics);

        localStorage.setItem('hidden_topics', hiddenTopics);
    }

    /**
     * Save ban
     * @param {string} url Url of topic
     */
    async saveBan(url) {
        let hiddenTopics = localStorage.getItem('hidden_topics');
        hiddenTopics =  hiddenTopics===null ? [] : JSON.parse(hiddenTopics);
        hiddenTopics.push({url: url, date: Date.now()});
        hiddenTopics = JSON.stringify(hiddenTopics);
        localStorage.setItem('hidden_topics', hiddenTopics);
    }

    /**
     * get list of banned topics
     * @returns {boolean|string[]} list of banned topics
     */
    async getAllBannedTopics() {
        this.cleanUpOldTopicsBans();
        let hiddenTopics = localStorage.getItem('hidden_topics');
        if (hiddenTopics===null) return [];
        hiddenTopics = JSON.parse(hiddenTopics);
        return hiddenTopics.map(t => t.url);
    }

    async isTopicBanned(url) {
        let hiddenTopics = localStorage.getItem('hidden_topics');
        if (hiddenTopics===null) return false;
        hiddenTopics = JSON.parse(hiddenTopics);
        return hiddenTopics.filter(topic => topic.url === url).length > 0;
    }

    async getAllTopicsInTracker() {
        const parser = new DOMParser();
        let data = await window._frt.Fetchers.fetch('https://www.linux.org.ru/tracker/');
        let htmlDoc = parser.parseFromString(data, 'text/html');
        let topics = Array.from(htmlDoc.querySelectorAll('table.message-table tbody tr'));
        topics = topics.map(tr => tr.getElementsByTagName('td')[1].querySelector('a').href);
        return topics;
    }

    async getFilteredTopicsInTracker() {
        let topics = await this.getAllTopicsInTracker();
        let hiddenTopics = this.getAllBannedTopics();

        if (!Array.isArray(hiddenTopics)) return topics;
        if (hiddenTopics.length === 0) return topics;

        return topics.filter(topic => {
            let url = new URL(topic);
            return !hiddenTopics.includes(url.pathname);
        });
    }
}

setTimeout(() => {
    if (typeof window._frt.utilslor === 'undefined') window._frt.utilslor = {};
    window._frt.utilslor.shared = new LorSharedUtils();
}, 3);
