setTimeout(() => {
    document.getElementById('subscription_block')?.remove();

    window._frt.utils.removeAllBySelector('div.banner');
    window._frt.utils.removeAllBySelector('.sticky-rails');
    window._frt.utils.removeAllBySelector('.itemLinkPET');
    window._frt.utils.removeAllBySelector('.bet-embed');
    window._frt.utils.removeAllBySelector('.inread-banner');
    window._frt.utils.removeAllBySelector('.inset-banner');
}, 5310);
