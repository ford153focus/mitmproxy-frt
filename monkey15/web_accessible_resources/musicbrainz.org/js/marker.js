(() => {
    let node;
    let res;

    res = document.evaluate('//td[text()=\'Single\']', document);
    while (node = res.iterateNext()) {
        for (let el of node.parentElement.querySelectorAll('td')) {
            el.style['background-color'] = '#aca';
        }
    }

    res = document.evaluate('//td[text()=\'EP\']', document);
    while (node = res.iterateNext()) {
        for (let el of node.parentElement.querySelectorAll('td')) {
            el.style['background-color'] = '#ada';
        }
    }

    res = document.evaluate('//td[text()=\'Album\']', document);
    while (node = res.iterateNext()) {
        for (let el of node.parentElement.querySelectorAll('td')) {
            el.style['background-color'] = '#afa';
        }
    }
})();
