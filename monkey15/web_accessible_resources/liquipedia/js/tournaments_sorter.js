setTimeout(() => {
    for (let tournaments_type of document.querySelectorAll('.tournaments-list-type-list')) {
        let itemsList = tournaments_type.querySelectorAll('li');
        let itemsArray = Array.from(itemsList);
        if (itemsArray.length === 0) continue;

        itemsArray
            .sort((item1, item2) => {
                var element1 = item1.querySelector('[data-filter-group="tournaments-list-liquipediatier"]');
                var value1 = parseInt(element1.dataset.filterCategory);

                var element2 = item2.querySelector('[data-filter-group="tournaments-list-liquipediatier"]');
                var value2 = parseInt(element2.dataset.filterCategory);

                return value1 - value2;
            })
            .map((item) => {
                itemsArray[0].parentElement.appendChild(item);
            });
    }
}, 1530);
