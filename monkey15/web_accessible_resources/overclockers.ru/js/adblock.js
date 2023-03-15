setTimeout(() => {
    window._frt.utils.removeAllBySelector('iframe');
    window._frt.utils.removeAllBySelector('ins');
    window._frt.utils.removeAllBySelector('[id^="google"]');
    window._frt.utils.removeAllBySelector('[id^="yandex"]');
    window._frt.utils.removeAllBySelector('[id^="inpage"]');
}, 5);
