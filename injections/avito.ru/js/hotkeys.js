function keyPressListener(event) {
    if (event.code === 'ArrowRight' && event.ctrlKey === true) {
        let paginationButtonNext = document.querySelector('span[data-marker="pagination-button/next"]');
        if (paginationButtonNext !== null) paginationButtonNext.click();
    }
    if (event.code === 'ArrowLeft' && event.ctrlKey === true) {
        let paginationButtonPrev = document.querySelector('span[data-marker="pagination-button/prev"]');
        if (paginationButtonPrev !== null) paginationButtonPrev.click();
    }
}

document.onkeypress = keyPressListener;
document.onkeyup  = keyPressListener;
