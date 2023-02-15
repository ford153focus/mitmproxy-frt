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
     * Dynamically load Twitter's Bootstrap
     * @returns {void}
     */
    loadBootstrap () {
        this.loadStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css');
        this.loadScriptFile('https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js');
    }

    /**
     * Dynamically load Font Awesome
     * @returns {void}
     */
    loadFontAwesome() {
        this.loadStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
    }

    loadNotifier() {
        if (typeof jQuery === 'undefined') this.injectScriptFile('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js');
        setTimeout(() => { window._frt.injectScriptFile('https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js'); }, 300); // need setTimeout to wait jquery load
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

    notify(text) {
        if (window.jQuery.notify) {
            window.jQuery.notify(
                text,
                {
                    position: "bottom right"
                }
            );
        } else {
            alert(text);
            console.info(text);
        }
    }

    constructor() {
        this.loadNotifier();
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
    return Array.from(this);
};

HTMLElement.prototype.frtRemove = function(method='remove') {
    if (method==='hide')    this.style.display = 'none';
    if (method==='nullify') this.innerHTML = '';
    if (method==='remove')  this.remove();
};

NodeList.prototype.frtToArray = function() {
    return Array.from(this);
};

Array.prototype.frtRemoveDuplicates = function () {
    let set = new Set(this);
    return Array.from(set);
};

String.prototype.frtFixSpaces = function () {
    return this.replaceAll('&nbsp;', ' ').replaceAll(' ', ' ');
};

String.prototype.frtToInt = function () {
    return parseInt(this);
};

String.prototype.frtToFloat = function () {
    return parseFloat(this);
};

String.prototype.frtHtmlEntitiesEncode = function () {
    return this
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

String.prototype.frtHtmlEntitiesEncode2 = function () {
    return Array
        .from(this)
        .map(c => '&#'+c.charCodeAt(0)+';')
        .join('');
};
