setTimeout(() => {
    document.getElementById('INCONTENT_WRAPPER')?.remove();
    document.getElementById('WikiaFooter')?.remove();
    document.getElementById('WikiaRailWrapper')?.remove();
    window._frt.removeSelectorAll('div[id^="google_ads_iframe_"]');
}, 5);
