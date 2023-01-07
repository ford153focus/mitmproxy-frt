setTimeout(() => {
    let items = document.querySelectorAll('[data-marker="favorite-search"]').frtToArray();

    items
        .sort((item1, item2) => {
            let cat1 = item1.querySelector('[data-marker="favorite-search/title"] a').innerText;
            let title1 = item1.querySelector('[data-marker="favorite-search/title"]').innerText;
    
            let cat2 = item2.querySelector('[data-marker="favorite-search/title"] a').innerText;
            let title2 = item2.querySelector('[data-marker="favorite-search/title"]').innerText;
    
            return cat1===cat2 ? title1.localeCompare(title2) : cat1.localeCompare(cat2);
        })
        .sort((item1, item2) => {
            let newAdsIndicator1 = item1.querySelectorAll('div[class^="index-count"] div[class^="index-blue-round"]').length;
            let newAdsIndicator2 = item2.querySelectorAll('div[class^="index-count"] div[class^="index-blue-round"]').length;
    
            return newAdsIndicator2-newAdsIndicator1;
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}, 531);
