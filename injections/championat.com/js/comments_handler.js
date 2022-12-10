window.switchCommentsVisibility = function () {
    let el = document.getElementById('comments');

    if (!el.style.display || el.style.display === 'none') {
        el.style.display = 'block';
        el.style.width = 'auto';
        el.style.height = 'auto';
    } else {
        el.style.display = 'none';
    }
};
