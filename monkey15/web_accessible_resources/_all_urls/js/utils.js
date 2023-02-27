// noinspection JSUnusedGlobalSymbols

class FrtUtils {
    removeSelectorAll (selector, method='remove') {
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
     * Fetch json from api in modern style
     * use with await
     * @param {string} url target link
     * @param {boolean} isJson requested data is (not) json
     * @returns {Promise<any>} decoded json-object
     */
    async fetch (url, isJson=false) {
        const response = await fetch(url);
        return isJson ? await response.json() : await response.text();
    }

    /**
     * Fetch json from api synchronously
     * @param {string} url Link to api-method
     * @param {boolean} isJson is JSON?
     * @returns {any} Parsed JSON-object
     */
    fetchSync (url, isJson=false) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
    }


    async getExtensionFileContent (filePath) {
        let url = chrome.runtime.getURL(filePath);
        return await this.fetch(url);
    }

    getExtensionFileContentSync (filePath) {
        let url = chrome.runtime.getURL(filePath);
        return this.fetchSync(url);
    }

    /**
     * Inject style sheet to current page
     * @param {string} url url of style sheet
     * @returns {void}
     */
    loadStyleSheet (url) {
        let tag = document.createElement('link');
        tag.rel = 'stylesheet';
        tag.href = url;
        tag.crossorigin = 'anonymous';
        document.head.appendChild(tag);
    }

    /**
     * Inject script to current page
     * @param {string} url url of script
     * @returns {void}
     */
    loadScriptFile (url) {
        let tag = document.createElement('script');
        tag.src = url;
        tag.crossorigin = 'anonymous';
        document.body.appendChild(tag);
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
        while (new Date() < milliseconds) continue;
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

    /**
     * @param {string} path path to file that we will inject
     * @param {Element} element target of injection
     * @param {InsertPosition} where where injection will be located relatively to target
     */
    async injectMarkupFileFromExtension (path, element, where='beforeend') {
        let data = await this.fetch(chrome.runtime.getURL(path));
        element.insertAdjacentHTML(where, data);
    }

    /**
     * @param {string} script
     */
    injectScript(script) {
        document.body.insertAdjacentHTML('beforeend', '<script>'+script+'</script>');
    }

    /**
     * @param {string} path
     */
    injectScriptFile(path) {
        let script = document.createElement('script');
        script.src = path;
        document.body.appendChild(script);
    }

    /**
     * @param {string} path
     */
    injectExtensionScriptFile(path) {
        let script = document.createElement('script');
        script.src = chrome.runtime.getURL(path);
        document.body.appendChild(script);
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

if (!window._frt) window._frt = new FrtUtils();

/*
NodeList.prototype.frtRemoveAll = function(method='remove') {
    if (method==='nullify')
        for (let element of this)
            element.innerHTML = '';

    if (method==='hide')
        for (let element of this)
            element.style.display = 'none';

    if (method==='remove')
        for (let element of this)
            element.remove();
};
*/

HTMLCollection.prototype.frtToArray = function() {
    try {
        return Array.from(this);
    } catch (error) {
        console.warn(error);
    }
};

HTMLElement.prototype.frtRemove = function(method='remove') {
    try {
        if (method==='hide')    this.style.display = 'none';
        if (method==='nullify') this.innerHTML = '';
        if (method==='remove')  this.remove();
    } catch (error) {
        console.warn(error);
    }
};

HTMLElement.prototype.frtHide = function() {
    try {
        this.style.display = 'none';
    } catch (error) {
        console.warn(error);
    }
};

NodeList.prototype.frtToArray = function() {
    try {
        return Array.from(this);
    } catch (error) {
        console.warn(error);
    }
};

Array.prototype.frtRemoveDuplicates = function () {
    try {
        let set = new Set(this);
        let arr = Array.from(set);
        return arr;
    } catch (error) {
        console.warn(error);
    }
};

String.prototype.frtFixSpaces = function () {
    try {
        return this.replaceAll('&nbsp;', ' ').replaceAll(' ', ' ');
    } catch (error) {
        console.warn(error);
    }
};

String.prototype.frtToInt = function () {
    try {
        return parseInt(this);
    } catch (error) {
        console.warn(error);
    }
};

String.prototype.frtToFloat = function () {
    try {
        return parseFloat(this);
    } catch (error) {
        console.warn(error);
    }
};

String.prototype.frtHtmlEntitiesEncode = function () {
    try {
        let str = this;
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        return str;
    } catch (error) {
        console.warn(error);
    }
};

String.prototype.frtHtmlEntitiesEncode2 = function () {
    try {
        let array = Array.from(this);
        array = array.map(c => `&#${c.charCodeAt(0)};`);
        return array.join('');
    } catch (error) {
        console.warn(error);
    }
};
