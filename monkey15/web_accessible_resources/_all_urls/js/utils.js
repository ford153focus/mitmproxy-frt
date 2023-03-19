if (!window._frt) window._frt = {};

// noinspection JSUnusedGlobalSymbols
window._frt.Utils = class {
    removeAllBySelector (selector, method='remove') {
        let elements = document.querySelectorAll(selector);

        if (method==='nullify')
            for (let el of elements)
                el.innerHTML = '';

        if (method==='hide')
            for (let el of elements)
                el.style.display = 'none';

        if (method==='remove')
            for (let el of elements)
                el.remove();
    }

    /**
     * Get elements by XPath query
     *
     * @param {string} query
     * @returns {HTMLElement[]}
     */
    getElementsByXPath(query) {
        /** @type {HTMLElement[]} */
        let result = [];

        /** @type {XPathResult} */
        let xPathResult = document.evaluate(query, document, null, 7);

        for (let i = 0; i < xPathResult.snapshotLength; i++) {
            result.push(xPathResult.snapshotItem(i));
        }

        return result;
    }

    /**
     * Async sleep implementation in JS
     * @param {number} milliseconds Sleep length
     */
    sleep (milliseconds) {
        return new Promise(
            // eslint-disable-next-line no-unused-vars
            resolve => setTimeout(_ => resolve(), milliseconds)
        );
    }

    /**
     * Sleep implementation in JS
     * @param {number} milliseconds Sleep length
     */
    sleepSync (milliseconds) {
        milliseconds += new Date().getTime();
        while (new Date() < milliseconds) {
            // noinspection UnnecessaryContinueJS
            continue;
        }
    }

    /**
     * Strip all html tags
     * @param {string} html Original html-code
     * @returns {string} Stripped text
     */
    stripTags (html) {
        let div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    /**
     *
     * @param {string} str Original HTML-code
     * @returns {HTMLCollection} HTML-tags
     */
    strToDom (str) {
        let parser = new DOMParser();
        let document = parser.parseFromString(str, 'text/html');
        return document.body.children;
    }

    parseQueryString() {
        if (this.queryParams === undefined) { // check for already saved results
            let queryString = window.location.search; // query string as it
            queryString = queryString.replace(/^\?/g, ''); // trim question mark in begin
            this.queryParams = {}; // initialize object
            for (let segment of queryString.split('&')) { // split QS by ampersand and iterate it
                let [key, value] = segment.split('='); // split segment of QS
                this.queryParams[key]=value; // save parameter
            }
        }

        return this.queryParams;
    }

    notify(text, type='success') {
        if (typeof window.notyf === 'undefined') window.notyf = new Notyf();
        notyf[type](text);
    }

    constructor() {
        //
    }
}

window._frt.utils = new window._frt.Utils();
