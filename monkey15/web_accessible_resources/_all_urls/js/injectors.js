if (!window._frt) window._frt = {};

window._frt.Injectors = class {
    /**
     * @param {string} tag_name
     * @param {object} attributes
     */
    static appendTagToHead(tag_name, attributes) {
        let tag = document.createElement(tag_name);

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            tag[attrName] = attrValue;
        }

        document.head.appendChild(tag);
    }

    /**
     * @param {object} attributes
     */
    static injectScript(attributes) {
        this.appendTagToHead('script', attributes);
    }

    /**
     * @param {object} attributes
     */
    static injectInternalScript(attributes) {
        attributes.src = chrome.runtime.getURL(attributes.src);
        this.injectScript(attributes);
    }

    /**
     * @param {object} attributes
     */
    static injectSheet(attributes) {
        attributes.rel = 'stylesheet';
        this.appendTagToHead('link', attributes);
    }

    /**
     * @param {object} attributes
     */
    static injectInternalStyleSheet(attributes) {
        attributes.href = chrome.runtime.getURL(attributes.href);
        this.injectSheet(attributes);
    }

    /**
     * @param {string} url
     * @param {HTMLElement} target
     * @param {InsertPosition} position
     * @returns {Promise<void>}
     */
    static async injectInternalHTML(url, target= document.body, position= 'beforeend') {
        let markupString = await window._frt.Fetchers.getExtensionFileContent(url);
        target.insertAdjacentHTML(position, markupString);
    }
};
