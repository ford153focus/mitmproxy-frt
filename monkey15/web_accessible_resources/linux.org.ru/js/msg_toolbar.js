function fixHeight(event) {
    let commentInput = event.target;
    if (commentInput.scrollHeight !== commentInput.clientHeight) {
        commentInput.style.height = `${commentInput.scrollHeight+5}px`;
    }
}

setTimeout(async () => {
    window._frt.LibraryLoaders.fontAwesome();
    await window._frt.Injectors.injectInternalScript('/web_accessible_resources/linux.org.ru/msg_toolbar_2.js');
    window._frt.utilscttMarkup = await window._frt.Fetchers.getExtensionFileContent('/web_accessible_resources/linux.org.ru/html/msg_toolbar.html');
}, 5);

setInterval(async () => {
    for (let textarea of document.querySelectorAll('textarea#msg')) {
        if (textarea.previousElementSibling.classList.contains('msg_toolbar')) continue; //if toolbar already present...
        textarea.insertAdjacentHTML('beforebegin', window._frt.utilscttMarkup); //insert toolbar markup
        textarea.onkeyup = fixHeight;
    }
}, 1530);
