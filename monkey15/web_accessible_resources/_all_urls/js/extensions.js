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

HTMLElement.prototype.frtSetStyle = function(key, value) {
    try {
        this.style[key] = value;
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
        if (this === null) return;
        if (this === undefined) return;
        if (typeof this[Symbol.iterator] !== 'function') return;

        let set = new Set(this);
        return Array.from(set);
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

String.prototype.frtRemoveSpaces = function () {
    return this
        .trim()
        .frtFixSpaces()
        .replaceAll(' ', '');
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

/**
 * Convert XPathResult to array
 * @returns HTMLElement[]
 */
XPathResult.prototype.frtToArray = function() {
    let result = null;
    let results = [];

    switch (this.resultType) {
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
            while ( (result = this.iterateNext()) != null ) {
                results.push(result);
            }
            return results;
        case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
            for (let i=0; i < this.snapshotLength; i++) {
                results.push(this.snapshotItem(i));
            }
            return results;
        default:
            return this.singleNodeValue;
    }
};

/**
 * Query elements by xPath
 * @param {string} xPathQuery
 * @returns HTMLElement[]
 */
document.frtGetElementsByXPath = function (xPathQuery) {
    let xPathResult = document.evaluate( xPathQuery, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
    return xPathResult.frtToArray();
};
