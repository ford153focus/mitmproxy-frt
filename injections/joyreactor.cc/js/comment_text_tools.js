class FrtJrCtt {
    markup;

    static fixHeight(event) {
        let commentInput = event.target;
        if (commentInput.scrollHeight !== commentInput.clientHeight) {
            commentInput.style.height = `${commentInput.scrollHeight + 5}px`;
        }
    }

    /**
     * @param {Element} element
     */
    wrapTextAreaSelection(element) {
        if (element.tagName !== 'LI') element = element.parentElement;
        let textArea = element.parentElement.nextElementSibling;

        let prefix = element.getAttribute('data-prefix');
        let suffix = element.getAttribute('data-suffix');

        let taLength = textArea.value.length;
        let selStart = textArea.selectionStart;
        let selEnd = textArea.selectionEnd;
        let selectedText = textArea.value.substring(selStart, selEnd);
        let replacement = prefix + selectedText + suffix;
        textArea.value = textArea.value.substring(0, selStart) + replacement + textArea.value.substring(selEnd, taLength);
        textArea.focus();
    }

    constructor() {
        this.markup = _frt.fetchSync('https://example.com/___frt/injections/joyreactor.cc/html/comment_text_tools.html');
    }
}

setTimeout(async () => {
    if (!window.___frt) window.___frt = {};
    window.___frt.ctt = new FrtJrCtt();
}, 5);

setInterval(async () => {
    for (let textarea of document.querySelectorAll('textarea.comment_text')) {
        if (textarea.previousElementSibling.classList.contains('comment_text_tools')) continue; //if toolbar already present...
        textarea.insertAdjacentHTML('beforebegin', window.___frt.ctt.markup); //insert toolbar markup
        textarea.onkeyup = FrtJrCtt.fixHeight;
    }
}, 1530);
