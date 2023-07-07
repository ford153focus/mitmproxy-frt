function adBlock() {
    document.getElementById('left-sidebar').innerHTML = '';
    document.getElementById('right-sidebar').innerHTML = '';
    document.getElementById('most-commented').innerHTML = '';
    document.getElementById('yandex-widget-offers').innerHTML = '';

    document.querySelector('.content-block.relatedbox.rbxglob').innerHTML = '';
    window._frt.utils.removeAllBySelector('.nomargins.ad');
}

function noComments() {
    document.querySelector('.commentlinkblock')?.remove();
    document.querySelector('.comment-warn')?.remove();
    document.getElementById('mc-container')?.remove();
}

function observerCallback() {
    adBlock();
    noComments();
}

const observer = new MutationObserver(observerCallback);
const config = { attributes: true, childList: true, subtree: true };
observer.observe(document.body, config);
