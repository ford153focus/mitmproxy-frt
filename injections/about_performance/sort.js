function sort() {
    let items = document.querySelectorAll('#dispatch-tbody > tr');

    [...items]
        .sort((item1, item2) => {
            let task1RamUsage = parseFloat(item1.querySelector('td[data-l10n-id="size-MB"]').innerText);
            let task2RanUsage = parseFloat(item2.querySelector('td[data-l10n-id="size-MB"]').innerText);
            return task2RanUsage - task1RamUsage;
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

setInterval(sort, 153);
