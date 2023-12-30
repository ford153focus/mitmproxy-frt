[...document.querySelectorAll('i.icon.icon-expand')]
    .map(el => el.parentElement)
    .filter(el => window.getComputedStyle(el).getPropertyValue('opacity') === '1')
    .forEach(el => el.click());
