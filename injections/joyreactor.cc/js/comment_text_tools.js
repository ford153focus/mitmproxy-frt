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
        let cttElement = document.querySelector('ul.comment_text_tools');
        this.markup = cttElement.outerHTML;
        cttElement.remove();
    }
}

setTimeout(async () => {
    if (!window.___frt) {
        window.___frt = {};
    }
    if (!window.___frt.jr) {
        window.___frt.jr = {};
    }

    window.___frt.jr.ctt = new FrtJrCtt();
}, 5);

setInterval(async () => {
    for (let textarea of document.querySelectorAll('textarea.comment_text')) {
        if (textarea.previousElementSibling.classList.contains('comment_text_tools')) continue; //if toolbar already present...
        textarea.insertAdjacentHTML('beforebegin', window.___frt.jr.ctt.markup); //insert toolbar markup
        textarea.onkeyup = FrtJrCtt.fixHeight;
    }
}, 1530);
