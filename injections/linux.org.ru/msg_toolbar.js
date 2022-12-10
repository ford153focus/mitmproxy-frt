/**
 * @param {HTMLTextAreaElement} textArea
 * @param {string} prefix
 * @param {string} suffix
 * @param {string} defaultText
 */
window.wrapTextAreaSelection = function(textArea, prefix, suffix, defaultText='') {
    let taLength = textArea.value.length;
    let selStart = textArea.selectionStart;
    let selEnd = textArea.selectionEnd;
    let selectedText = textArea.value.substring(selStart, selEnd);
    if (!selectedText) selectedText = defaultText;
    let replacement = prefix + selectedText + suffix;
    textArea.value = textArea.value.substring(0, selStart) + replacement + textArea.value.substring(selEnd, taLength);
    textArea.focus();
}

/**
 * @param {Element} element
 */
window.cttHandler = function(element) {
    let textArea = element.tagName === 'LI' ? element.parentElement.nextElementSibling
                                            : element.parentElement.parentElement.nextElementSibling;

    let tableMarkup ='| head1 | head2 |\n';
    tableMarkup+='|-------|-------|\n';
    tableMarkup+='| body1 | %%%%% |';
    tableMarkup = tableMarkup.split('%%%%%');

    if (Array.from(element.classList).includes('ctt_b'))     window.wrapTextAreaSelection(textArea, '__', '__');
    if (Array.from(element.classList).includes('ctt_i'))     window.wrapTextAreaSelection(textArea, '_', '_');
    if (Array.from(element.classList).includes('ctt_s'))     window.wrapTextAreaSelection(textArea, '~~', '~~');

    if (Array.from(element.classList).includes('ctt_table')) window.wrapTextAreaSelection(textArea, tableMarkup[0], tableMarkup[1]);
    if (Array.from(element.classList).includes('ctt_link'))  window.wrapTextAreaSelection(textArea, '[', '](URL)', 'TEXT');

    if (Array.from(element.classList).includes('ctt_code'))  window.wrapTextAreaSelection(textArea, '```bash\n', '\n```');
    if (Array.from(element.classList).includes('ctt_cut'))   window.wrapTextAreaSelection(textArea, '>>>\n\n', '\n\n<<<');

    if (Array.from(element.classList).includes('ctt_shrug')) window.wrapTextAreaSelection(textArea, '', '¯\\\\_(ツ)_/¯');
}
