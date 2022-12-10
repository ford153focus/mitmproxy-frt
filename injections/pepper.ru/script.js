class PepperUtils {
    constructor() {
        this.itemsFilter();
        this.itemsSort();
    }

    getItems() {
        return Array.from(
            document.querySelectorAll('article.thread')
        );
    }

    itemsFilter() {
        for (let item of this.getItems()) {
            let rating = parseInt(item.querySelector('.vote-box > span').innerText);
            if (rating < -100) item.style.display = item.style.display === 'none' ? 'block' : 'none';
        }
    }

    itemsSort(sortBy='price') {
        let comparator;
        if (sortBy==='price') comparator = this.itemsPriceComparator;
        if (sortBy==='votes') comparator = this.itemsVotesComparator;

        this.getItems()
            .sort(comparator)
            .map((item) => this.getItems()[0].parentElement.appendChild(item));
    }

    itemsPriceComparator(item1, item2) {
        try {
            let price1 = item1.querySelector('span.thread-price').innerText.replaceAll(/\s/gi, '');
            let price2 = item2.querySelector('span.thread-price').innerText.replaceAll(/\s/gi, '');
            return parseInt(price1) - parseInt(price2);
        } catch (_) {
            // console.log(e);
            return 0;
        }
    }
    itemsVotesComparator(item1, item2) {
        try {
            let price1 = item1.querySelector('span.vote-temp').innerText;
            let price2 = item2.querySelector('span.vote-temp').innerText;
            return parseInt(price2) - parseInt(price1);
        } catch (_) {
            // console.log(e);
            return 0;
        }
    }
}

setTimeout(() => {
    window.___frt = new PepperUtils();
}, 1530);
