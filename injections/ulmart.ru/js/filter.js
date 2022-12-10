setInterval(() => {
    let statuses = ['Неремонтопригодный', 'Неработоспособный', 'Механические повреждения'];

    for (const item of document.querySelectorAll('div.goods-wrap')) {
        if (item.querySelector('div.condition')) {
            let condition = item.querySelector('div.condition').innerText;
            if (statuses.includes(condition)) {
                item.style.display = 'none';
            }
        }
    }
}, 5310);
