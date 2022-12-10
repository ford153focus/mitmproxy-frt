function keyPressListener(event) {
    if (event.code === 'ArrowRight' && event.ctrlKey === true) {
        let paginationButtonNext = document.querySelector('#main article .foot .pagination span').previousElementSibling;
        if (paginationButtonNext !== null) paginationButtonNext.click();
    }
    if (event.code === 'ArrowLeft' && event.ctrlKey === true) {
        let paginationButtonPrev = document.querySelector('#main article .foot .pagination span').nextElementSibling;
        if (paginationButtonPrev !== null) paginationButtonPrev.click();
    }
}

document.onkeypress = keyPressListener;
document.onkeyup  = keyPressListener;
