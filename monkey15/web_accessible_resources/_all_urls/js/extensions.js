/*
window._frt.ext.NodeList.frtRemoveAll = function(method='remove') {
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

if (!window._frt) window._frt = {};
window._frt.ext = {};
window._frt.ext.Array = {};
window._frt.ext.HTMLCollection = {};
window._frt.ext.HTMLElement = {};
window._frt.ext.NodeList = {};
window._frt.ext.String = {};
window._frt.ext.XPathResult = {};

window._frt.ext.HTMLCollection.frtToArray = function() {
    try {
        return Array.from(this);
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.HTMLElement.frtRemove = function(method='remove') {
    try {
        if (method==='hide')    this.style.display = 'none';
        if (method==='nullify') this.innerHTML = '';
        if (method==='remove')  this.remove();
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.HTMLElement.frtSetStyle = function(key, value) {
    try {
        this.style[key] = value;
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.HTMLElement.frtHide = function() {
    try {
        this.style.display = 'none';
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.NodeList.frtToArray = function() {
    try {
        return Array.from(this);
    } catch (error) {
        console.warn(error);
    }
};

/**
 * @param {any[]|null} arr
 * @returns {any[]|void}
 */
window._frt.ext.Array.frtRemoveDuplicates = function (arr = null) {
    if (arr === null) arr = this;

    try {
        if (arr === null) return;
        if (arr === undefined) return;
        if (typeof arr[Symbol.iterator] !== 'function') return;

        let set = new Set(arr);
        return Array.from(set);
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.String.frtFixSpaces = function () {
    try {
        return this.replaceAll('&nbsp;', ' ').replaceAll(' ', ' ');
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.String.frtRemoveSpaces = function () {
    return this
        .trim()
        .frtFixSpaces()
        .replaceAll(' ', '');
};

window._frt.ext.String.frtToInt = function () {
    try {
        return parseInt(this);
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.String.frtToFloat = function () {
    try {
        return parseFloat(this);
    } catch (error) {
        console.warn(error);
    }
};

window._frt.ext.String.frtHtmlEntitiesEncode = function () {
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

window._frt.ext.String.frtHtmlEntitiesEncode2 = function () {
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
window._frt.ext.XPathResult.frtToArray = function() {
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

// Array.prototype.frtRemoveDuplicates = window._frt.ext.Array.frtRemoveDuplicates;
// HTMLCollection.prototype.frtToArray = window._frt.ext.HTMLCollection.frtToArray;
// HTMLElement.prototype.frtHide = window._frt.ext.HTMLElement.frtHide;
// HTMLElement.prototype.frtRemove = window._frt.ext.HTMLElement.frtRemove;
// HTMLElement.prototype.frtSetStyle = window._frt.ext.HTMLElement.frtSetStyle;
// NodeList.prototype.frtToArray = window._frt.ext.NodeList.frtToArray;
// String.prototype.frtFixSpaces = window._frt.ext.String.frtFixSpaces;
// String.prototype.frtHtmlEntitiesEncode = window._frt.ext.String.frtHtmlEntitiesEncode;
// String.prototype.frtHtmlEntitiesEncode2 = window._frt.ext.String.frtHtmlEntitiesEncode2;
// String.prototype.frtRemoveSpaces = window._frt.ext.String.frtRemoveSpaces;
// String.prototype.frtToFloat = window._frt.ext.String.frtToFloat;
// String.prototype.frtToInt = window._frt.ext.String.frtToInt;
// XPathResult.prototype.frtToArray = window._frt.ext.XPathResult.frtToArray;
