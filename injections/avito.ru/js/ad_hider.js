// noinspection HttpUrlsUsage,NonBlockStatementBodyJS,BreakStatementJS,ContinueStatementJS

class AvitoHideUtility {
    /**
     * Get HTML-element of advert by HTML-element of hiding button
     * @param {HTMLElement} element HTML-element of hiding button
     * @returns {HTMLElement} HTML-element of advert
     */
    static getAdvertElement(element) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (element===document) throw 'Can not find the advert element'; // avoid infinite cycle

            element = element.parentElement;

            if (!element.hasAttribute('itemtype')) continue;
            if (element.getAttribute('itemtype') !== 'http://schema.org/Product') continue;
            if (!element.hasAttribute('data-item-id')) continue;
            if (isNaN(parseInt(element.getAttribute('data-item-id')))) continue;
            break;
        }

        return element;
    }

    /**
     * Get all banned adverts
     * @returns {[]} array of IDs of banned adverts
     */
    static getBanList() {
        let storedItem = localStorage.getItem('ban_list');
        return storedItem===null ? [] : JSON.parse(storedItem); // return empty array if value not set
    }

    /**
     *
     * @param {MouseEvent} event Click on hiding button
     */
    static banAdvert(advertID) {
        let banList = AvitoHideUtility.getBanList();
        banList.push(advertID); // add to ban list
        banList = [...new Set(banList)]; // only unique values
        localStorage.setItem('ban_list', JSON.stringify(banList)); // save to local storage

        AvitoHideUtility.hideBanned();
    }

    static hideBanned() {
        for (const aid of AvitoHideUtility.getBanList()) {
            let selector = `[itemtype="http://schema.org/Product"][data-item-id="${aid}"]`;
            let advert = document.querySelector(selector);
            if (advert !== null) advert.style.display = 'none';
        }
    }

    static drawHideButtons() {
        let adverts = document.querySelectorAll('[itemtype="http://schema.org/Product"]');

        for (let advert of adverts) {
            let hideButton = document.createElement('div');
            hideButton.innerHTML = '❌';
            hideButton.className = 'hide-this-ad';
            hideButton.onclick = () => AvitoHideUtility.banAdvert(advert.getAttribute('data-item-id'));
            advert.insertAdjacentElement('afterend', hideButton);
        }
    }
}

setTimeout(() => {
    AvitoHideUtility.hideBanned();
    AvitoHideUtility.drawHideButtons();
}, 3510)
