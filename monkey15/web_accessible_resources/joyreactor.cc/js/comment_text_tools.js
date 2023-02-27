if (!window.___frt) window.___frt = {};

window.___frt.TextAreaTools = class {
    markup;

    fixHeight(event) {
        let commentInput = event.target;

        if (commentInput.scrollHeight === commentInput.clientHeight) return;
        if (commentInput.nodeName !== 'TEXTAREA') return;

        commentInput.style.height = commentInput.scrollHeight+9+'px';
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
        // this.markup = _frt.fetchSync('https://example.com/___frt/injections/joyreactor.cc/html/comment_text_tools.html');
        // this.markup = _frt.getExtensionFileContentSync('/web_accessible_resources/joyreactor.cc/html/comment_text_tools.html');
        this.markup = document.querySelector('ul.comment_text_tools').cloneNode(true);
        document.onkeyup = this.fixHeight;
    }
}

setTimeout(async () => {
    window.___frt.textAreaTools = new window.___frt.TextAreaTools();
}, 5);

setInterval(async () => {
    for (let textarea of document.querySelectorAll('textarea.comment_text')) {
        if (textarea.getAttribute('ctt-injected') !== null) return; //if toolbar already present...
        textarea.insertAdjacentElement('beforebegin', window.___frt.textAreaTools.markup); //insert toolbar markup
        textarea.setAttribute('ctt-injected', '1');
    }
}, 1530);
