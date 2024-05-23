setInterval(() => {
    if (parseInt(document.getElementById('time')?.innerText.split(':').shift()) < 9) {
        document.querySelector('a[href="more.html"]').click();
    }
}, 5310);
