(() => {
    function adBlock() {
        document.getElementById('left-sidebar')?.frtRemove('nullify');
        document.getElementById('right-sidebar')?.frtRemove('nullify');
        document.getElementById('most-commented')?.frtRemove('nullify');
        document.getElementById('yandex-widget-offers')?.frtRemove('nullify');

        document.querySelector('.content-block.relatedbox.rbxglob')?.frtRemove('nullify');

        window._frt.removeSelectorAll('.nomargins.ad');
    }

    function noComments() {
        document.querySelector('.commentlinkblock')?.remove();
        document.querySelector('.comment-warn')?.remove();
        document.getElementById('mc-container')?.remove();
    }

    setInterval(() => {
        adBlock();
        noComments();
    }, 1500);
})();
