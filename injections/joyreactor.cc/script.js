/**
 * @param {HTMLTextAreaElement} textArea
 * @param {string} prefix
 * @param {string} suffix
 */
function wrapTextAreaSelection(textArea, prefix, suffix) {
    let taLength = textArea.value.length;
    let selStart = textArea.selectionStart;
    let selEnd = textArea.selectionEnd;
    let selectedText = textArea.value.substring(selStart, selEnd);
    let replacement = prefix + selectedText + suffix;
    textArea.value = textArea.value.substring(0, selStart) + replacement + textArea.value.substring(selEnd, taLength);
    textArea.focus();
}

/**
 * @param {Element} element
 */
function cttHandler(element) {
    let textArea = element.tagName === 'LI' ? element.parentElement.nextElementSibling
                                            : element.parentElement.parentElement.nextElementSibling;

    switch (element.className) {
        case "ctt_quote":
            wrapTextAreaSelection(textArea, "<i>&nbsp;&nbsp;&nbsp;&nbsp;&gt;", "</i>\n\n");
            break;
        case "ctt_h3":
            wrapTextAreaSelection(textArea, '<h3>', '</h3>');
            break;
        case "ctt_h4":
            wrapTextAreaSelection(textArea, '<h4>', '</h4>');
            break;
        case "ctt_p":
            wrapTextAreaSelection(textArea, '<p>', '</p>');
            break;
        case "ctt_b":
            wrapTextAreaSelection(textArea, '<b>', '</b>');
            break;
        case "ctt_i":
            wrapTextAreaSelection(textArea, '<i>', '</i>');
            break;
        case "ctt_u":
            wrapTextAreaSelection(textArea, '<u>', '</u>');
            break;
        case "ctt_s":
            wrapTextAreaSelection(textArea, '<s>', '</s>');
            break;
        case "ctt_table":
            wrapTextAreaSelection(textArea, '<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>', '</td>\n\t\t</tr>\n\t</tbody>\n</table>');
            break;
        case "ctt_link":
            wrapTextAreaSelection(textArea, '<a href="', '">LINK</a>');
            break;
        case "ctt_image":
            wrapTextAreaSelection(textArea, '<img src="', '">');
            break;
        case "ctt_shrug":
            wrapTextAreaSelection(textArea, '', '¯\\_(ツ)_/¯');
            break;
        default:
            console.error('Unknown element received');
    }
}

/**
 * Async vote function
 * @param {HTMLSpanElement} span Vote button, HTML Element
 * @returns {Promise<void>} Empty promise
 */
async function vote(span) {
    let commentId = span.parentNode.parentNode.querySelector('.comment_link').href.match(/\d+$/g);
    let voteDirection = span.attributes['data-vote'].value;

    fetch(`/comment_vote/add/${commentId}/${voteDirection}?token=${window.token}`)
        .then(async function (response) {
            span.parentElement.innerHTML = await response.text()
        });
}
