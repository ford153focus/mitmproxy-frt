function fixHeight(event) {
    let commentInput = event.target;
    if (commentInput.scrollHeight !== commentInput.clientHeight) {
        commentInput.style.height = `${commentInput.scrollHeight+5}px`;
    }
}

setTimeout(async () => {
    window._frt.loadFontAwesome();
    await window._frt.injectExtensionScriptFile('/web_accessible_resources/linux.org.ru/msg_toolbar_2.js');
    window._frt.cttMarkup = await window._frt.getExtensionFileContent('/web_accessible_resources/linux.org.ru/msg_toolbar.html');
}, 5);

setInterval(async () => {
    for (let textarea of document.querySelectorAll('textarea#msg')) {
        if (textarea.previousElementSibling.classList.contains('msg_toolbar')) continue; //if toolbar already present...
        textarea.insertAdjacentHTML('beforebegin', window._frt.cttMarkup); //insert toolbar markup
        textarea.onkeyup = fixHeight;
    }
}, 1530);
