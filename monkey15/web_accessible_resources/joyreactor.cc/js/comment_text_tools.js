if (!window.___frt) window.___frt = {};

window.___frt.TextAreaTools = class {
    /**
     * @param ev {KeyboardEvent}
     */
    fixHeight(ev) {
        if (ev.target.scrollHeight === ev.target.clientHeight) return;
        if (ev.target.nodeName !== 'TEXTAREA') return;
        ev.target.style.height = `${ev.target.scrollHeight+10}px`;
    }

    /**
     * @param {MouseEvent} ev
     */
    wrapTextAreaSelection(ev) {
        if (![...ev.target.classList].includes('frt-ctt')) return;
        if (ev.target.tagName !== 'LI') return;
        let textArea = ev.target.parentElement.nextElementSibling;

        let prefix = ev.target.dataset['prefix'];
        let suffix = ev.target.dataset['suffix'];

        let taLength = textArea.value.length;
        let selStart = textArea.selectionStart;
        let selEnd = textArea.selectionEnd;
        let selectedText = textArea.value.substring(selStart, selEnd);
        let replacement = prefix + selectedText + suffix;
        textArea.value = textArea.value.substring(0, selStart) + replacement + textArea.value.substring(selEnd, taLength);
        textArea.focus();
    }

    injectToolbar() {
        for (let textarea of document.querySelectorAll('textarea.comment_text')) {
            if (textarea.getAttribute('ctt-injected') !== null) return; //if toolbar already present...
            // let toolbar = document.querySelector('ul.comment_text_tools').cloneNode(true);
            let toolbar = this.getToolbar();
            textarea.insertAdjacentElement('beforebegin', toolbar); //insert toolbar toolbar
            textarea.setAttribute('ctt-injected', '1'); // mark textarea that toolbar injected
        }
    }

    getActionButton(title, className, prefix, suffix) {
        let actionButton = document.createElement('li');
        actionButton.classList.add('frt-ctt');
        actionButton.classList.add(`ctt-${className}`);
        actionButton.dataset['prefix'] = prefix;
        actionButton.dataset['suffix'] = suffix;
        actionButton.innerHTML = title;
        actionButton.style['background'] = '#fdb201';
        actionButton.style['border'] = '0';
        actionButton.style['color'] = '#56400c';
        actionButton.style['cursor'] = 'pointer';
        actionButton.style['display'] = 'inline-block';
        actionButton.style['font-family'] = '"Open Sans", Tahoma, Arial, sans-serif';
        actionButton.style['font-size'] = '15px';
        actionButton.style['font-weight'] = 'bold';
        actionButton.style['height'] = '24px';
        actionButton.style['line-height'] = '16px';
        actionButton.style['margin'] = '0px 5px 3px 0';
        actionButton.style['padding'] = '4px 8px';
        actionButton.style['text-align'] = 'center';
        actionButton.style['text-decoration'] = 'none';
        actionButton.style['text-transform'] = 'uppercase';
        actionButton.style['width'] = '150px';
        return actionButton;
    }

    getToolbar(){
        let referenceToolbar = document.createElement('ul');
        referenceToolbar.style.display = 'block';

        referenceToolbar.appendChild(this.getActionButton('💬️ Quote',                 'quote',  '<i>    >', '</i>\n\n'));
        referenceToolbar.appendChild(this.getActionButton('🅰 &lt;h3&gt;',             'h3',     '<h3>', '</h3>'));
        referenceToolbar.appendChild(this.getActionButton('🅰 &lt;h4&gt;',             'h4',     '<h4>', '</h4>'));
        referenceToolbar.appendChild(this.getActionButton('📑 Paragraph',             'para',   '<p>', '</p>'));
        referenceToolbar.appendChild(this.getActionButton('𝐁𝐎𝐋𝐃',      'bold',   '<b>', '</b>'));
        referenceToolbar.appendChild(this.getActionButton('𝐼𝑇𝐴𝐿𝐼𝐶',    'italic', '<i>', '</i>'));
        referenceToolbar.appendChild(this.getActionButton('͟U͟n͟d͟e͟r͟l͟i͟n͟e͟', 'under',  '<u>', '</u>'));
        referenceToolbar.appendChild(this.getActionButton('̶̶S̶t̶r̶i̶k̶e̶',    'strike', '<s>', '</s>'));
        referenceToolbar.appendChild(this.getActionButton('🔢 Table',                 'table',  '<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>', '</td>\n\t\t</tr>\n\t</tbody>\n</table>'));
        referenceToolbar.appendChild(this.getActionButton('🌐 Link',                  'link',   '<a href="', '">LINK</a>'));
        referenceToolbar.appendChild(this.getActionButton('📷 Image',                 'image',  '<img src="', '">'));
        referenceToolbar.appendChild(this.getActionButton('🤷‍♂️ Shrug',                 'shrug',  '', '¯\\_(ツ)_/¯'));

        return referenceToolbar;
    }

    constructor() {
        document.onkeyup = this.fixHeight;
        document.onclick = this.wrapTextAreaSelection;
        setInterval(this.injectToolbar.bind(this), 1530);
    }
}

setTimeout(async () => {
    window.___frt.textAreaTools = new window.___frt.TextAreaTools();
}, 5);
