if (!window._frt) window._frt = {};

// noinspection JSUnusedGlobalSymbols
window._frt.Fetchers = class {
    /**
     * Fetch json from api in modern style
     * use with await
     * @param {string} url target link
     * @param {boolean} isJson requested data is (not) json
     * @returns {Promise<any>} decoded json-object
     */
    static async fetch (url, isJson=false) {
        const response = await fetch(url);
        return isJson ? await response.json() : await response.text();
    }

    /**
     * Fetch json from api synchronously
     * @param {string} url Link to api-method
     * @param {boolean} isJson is JSON?
     * @returns {any} Parsed JSON-object
     */
    static fetchSync (url, isJson=false) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
    }


    static async getExtensionFileContent (filePath) {
        let url = chrome.runtime.getURL(filePath);
        return await this.fetch(url);
    }

    static getExtensionFileContentSync (filePath) {
        let url = chrome.runtime.getURL(filePath);
        return this.fetchSync(url);
    }
}
