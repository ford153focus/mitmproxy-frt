let is_ssd = document.querySelectorAll('[itemprop="name"]').frtToArray().map(i => i.innerText).includes('Внутренние твердотельные накопители (SSD)');
let is_sd = document.querySelectorAll('[itemprop="name"]').frtToArray().map(i => i.innerText).includes('Карты флэш-памяти');

if (is_ssd || is_sd) {
    let price = parseInt(document.querySelector('[data-autotest-currency="₽"] > span').innerText.replace(' ', ''));

    let capacityGb = document.querySelectorAll('a').frtToArray().filter(a => a.innerText.endsWith('ГБ')).shift()?.innerText.frtToInt();
    let capacityTb = document.querySelectorAll('a').frtToArray().filter(a => a.innerText.endsWith('ТБ')).shift()?.innerText.frtToInt();

    let price_per_gb = -1;
    if(capacityGb !== undefined) price_per_gb = price/capacityGb;
    if(capacityTb !== undefined) price_per_gb = price/(capacityTb*1000);
    price_per_gb = price_per_gb.toFixed(2);

    let title = document.querySelector('h1');
    title.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (${price_per_gb} rub/gb)`;
}
