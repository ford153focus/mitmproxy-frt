let lat_to_cyr = {
    'e': 'е',
    'E': 'Е',
    'T': 'Т',
    'y': 'у',
    'o': 'о',
    'O': 'О',
    'p': 'р',
    'P': 'Р',
    'a': 'а',
    'A': 'А',
    'H': 'Р',
    'K': 'К',
    'x': 'х',
    'X': 'Х',
    'c': 'с',
    'C': 'С',
    'B': 'В',
    'M': 'М'
};

function normalizeString(str) {
    str = str.trim();
    str = str.toLowerCase();

    for (const [key, value] of Object.entries(lat_to_cyr)) {
        str = str.replaceAll(key, value);
    }

    return str;
}

let i1 = setInterval(() => {
    let divs = document.getElementsByTagName('div');
    divs = Array.from(divs);
    divs = divs.filter(div => normalizeString(div.innerText) === 'новости партнеров');
    if (divs.length === 0) return;
    let container = divs.pop().parentElement;
    container.remove();
    clearInterval(i1);
}, 500);
