setTimeout(() => {
    document.getElementById('onetag-wrapper-0')?.remove();
    document.getElementById('mobile-anchor')?.remove();
    document.getElementById('header_leaderboard')?.remove();
    document.getElementById('below_the_article')?.remove();
    document.getElementById('rightcol_top_anchor')?.remove();
    document.getElementsByClassName('page-content-rightcol')[0]?.remove();

    window._frt.utils.removeAllBySelector('iframe');
    window._frt.utils.removeAllBySelector('[data-google-query-id]');
}, 5);
