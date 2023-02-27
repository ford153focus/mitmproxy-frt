//https://spb.hh.ru/applicant/resumes/edit/experience

function fixHeight(event) {
    let commentInput = event.target;
    if (commentInput.scrollHeight !== commentInput.clientHeight) {
        commentInput.style.height = `${commentInput.scrollHeight+5}px`;
    }
}

document.querySelector('textarea').onkeyup = fixHeight;
document.querySelector('textarea').dispatchEvent(new KeyboardEvent('keyup', {'key': 'ArrowDown'}));
