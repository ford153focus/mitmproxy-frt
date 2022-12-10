// noinspection JSUnusedGlobalSymbols

class Utils {
    removeSelectorAll (selector, method='remove') {
        let elements = document.querySelectorAll(selector);
        for (let el of elements) {
            /* eslint-disable indent */
            switch (method) {
                case 'nullify':
                    el.innerHTML = '';
                    break;
                case 'hide':
                    el.style.display = 'none';
                    break;
                case 'remove':
                default:
                    el.remove();
                    break;
            }
            /* eslint-enable indent */
        }
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
        document.head.appendChild(tag);
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
        this.loadStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
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
    async injectHTML (path, element, where='beforeend') {
        let data = await this.fetch(chrome.runtime.getURL(path));
        element.insertAdjacentHTML(where, data);
    }

    /**
     * @param {string} script
     */
    injectScript(script) {
        document.body.insertAdjacentHTML('beforeend', '<script>'+script+'</script>')
    }

    /**
     * @param {string} path
     */
    injectScriptFile(path) {
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

    async parseFileAndInject(url) {
        let markupString = await this.getExtensionFileContent(url);
        let elements = window._frt.strToDom(markupString);
        for (const element of elements) {
            if (element.constructor.name === 'HTMLStyleElement') {
                document.head.appendChild(element.cloneNode(true));
            }
            else if (element.constructor.name === 'HTMLScriptElement') {
                let external = document.createElement('script');
                external.innerHTML = element.innerHTML;
                document.head.appendChild(external);
            }
            else {
                document.body.appendChild(element.cloneNode(true));
            }
        }
    }
}

class ArrayUtils {
    removeDuplicates(array) {
        let _s =new Set(array);
        let _a = Array.from(_s);
        return _a;
    }
}

if (!window._frt)            window._frt            = new Utils();
if (!window._frt.ArrayUtils) window._frt.ArrayUtils = new ArrayUtils();
