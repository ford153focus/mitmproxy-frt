fetch('https://example.com/___frt/injections/championat.com/html/comments_switcher.html')
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch((err) => {
            console.log(err);
        });

window.switchCommentsVisibility = function () {
    let el = document.getElementById("comments");

    if (!el.style.display || el.style.display === "none") {
        el.style.display = "block";
        el.style.width = "auto";
        el.style.height = "auto";
    } else {
        el.style.display = "none";
    }
}