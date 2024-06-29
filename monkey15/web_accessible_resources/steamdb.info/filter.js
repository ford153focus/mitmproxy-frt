// https://steamdb.info/sales/?max_price=999&min_reviews=0&min_rating=0&min_discount=55&sort=price_desc

// highlighted only
for (const el of document.querySelectorAll('tr.app')) {
    if (el.querySelector('span.cat-highlighted-deal')) continue;
    el.style.display = 'none';
}
