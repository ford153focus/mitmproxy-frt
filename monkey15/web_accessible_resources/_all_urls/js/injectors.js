if (!window._frt) window._frt = {};

window._frt.Injectors = class {
    static appendTagToHead(tag_name, attributes) {
        let tag = document.createElement(tag_name);

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            tag[attrName] = attrValue;
        }

        document.head.appendChild(tag);
    }

    static injectScript(attributes) {
        this.appendTagToHead('script', attributes);
    }

    static injectInternalScript(attributes) {
        attributes.src = chrome.runtime.getURL(attributes.src);
        this.injectScript(attributes);
    }

    static injectSheet(attributes) {
        attributes.rel = 'stylesheet';
        this.appendTagToHead('link', attributes);
    }

    static injectInternalStyleSheet(attributes) {
        attributes.href = chrome.runtime.getURL(attributes.href);
        this.injectSheet(attributes);
    }

    static async injectInternalHTML(url, target= document.body, position= 'beforeend') {
        let markupString = await window._frt.Fetchers.getExtensionFileContent(url);
        target.insertAdjacentHTML(position, markupString);
    }
}
