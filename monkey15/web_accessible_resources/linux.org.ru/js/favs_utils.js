class FrtLorFavsUtils {
    static async drawTable() {
        let el = document.getElementById('bd');
        el.innerHTML = '';
        await window._frt.Injectors.injectInternalHTML('/web_accessible_resources/linux.org.ru/html/favs_table.html', el, 'afterbegin');
        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/@fortawesome/fontawesome-free/css/all.css'});
    }

    static async fillTable() {
        let tbody = document.querySelector('#bd table.message-table tbody');

        const parser = new DOMParser();

        let endReached = false;
        let offset = 0;

        while (!endReached) {
            let data = await window._frt.Fetchers.fetch(`${window.location.href}?offset=${offset}`);
            let htmlDoc = parser.parseFromString(data, 'text/html');
            let articles = htmlDoc.querySelectorAll('#bd article');

            if (articles.length < 20) {
                endReached = true;
            }
            else {
                offset += 20;
            }

            for (const article of articles) {
                let row = document.createElement('tr');

                let dateCell = document.createElement('td');
                let dateCreated = article.querySelector('div.entry-body div.sign time');
                dateCreated ? dateCell.appendChild(dateCreated).cloneNode(true) : false;
                row.appendChild(dateCell);

                let groupCell = document.createElement('td');
                groupCell.style.whiteSpace = 'nowrap';
                let group = article.querySelector('div.group');
                group.innerHTML = group.innerHTML.replace(' — ', '<br>');
                group ? groupCell.appendChild(group).cloneNode(true) : false;
                row.appendChild(groupCell);

                let authorCell = document.createElement('td');
                authorCell.style.whiteSpace = 'nowrap';
                let author = article.querySelector('div.entry-body div.sign');
                if (author !== null) {
                    author.innerHTML = author.innerHTML.trim().replace('()', '').trim();
                    // noinspection HtmlUnknownTarget
                    author.insertAdjacentHTML('afterbegin', '<img src="/img/tuxlor.png" alt="@" title="@" width="7" height="16"> ');
                    authorCell.appendChild(author).cloneNode(true);
                }
                row.appendChild(authorCell);

                let titleCell = document.createElement('td');
                let title = article.querySelector('h1 a');
                title ? titleCell.appendChild(title).cloneNode(true) : false;
                row.appendChild(titleCell);

                let tagsCell = document.createElement('td');
                let tags = article.querySelector('div.entry-body p.tags');
                tags ? tagsCell.appendChild(tags).cloneNode(true) : false;
                row.appendChild(tagsCell);

                let commentsCell = document.createElement('td');
                let comments = article.querySelector('div.entry-body div.nav a');
                if (comments !== null) {
                    comments.innerText = parseInt(comments.innerText).toString();
                    commentsCell.appendChild(comments).cloneNode(true);
                }
                row.appendChild(commentsCell);

                tbody.appendChild(row);
            }
        }
    }
}

setTimeout(async () => {
    await FrtLorFavsUtils.drawTable();
    await FrtLorFavsUtils.fillTable();
}, 5);
