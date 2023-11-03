if (!window.___frt) window.___frt = {};

window.___frt.wrapper = class {
    bookmark;

    getIdCell() {
        let idCell = document.createElement('td');
        idCell.className = 'id';
        idCell.innerHTML = `<a href='/ru/post/${this.bookmark.id}/'>${this.bookmark.id}</a>`;
        return idCell;
    }

    getDateCell() {
        let dateCell = document.createElement('td');
        dateCell.className = 'date';

        let date = new Date(article.timePublished);
        let year = date.getFullYear();
        let month = `${date.getMonth() + 1}`.padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hour = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        dateCell.innerHTML = `${year}-${month}-${day}<br>${hour}:${minutes}:${seconds}`;

        return dateCell;
    }

    getAuthorCell() {
        let authorCell = document.createElement('td');
        authorCell.className = 'author';

        if (this.bookmark.author.avatarUrl !== '') {
            authorCell.innerHTML += `<a class='avatar' href='/ru/users/${this.bookmark.author.login}/'>
                                     <img alt='avatar' src='${this.bookmark.author.avatarUrl}'>
                                 </a><br>`;
        }

        authorCell.innerHTML += `<a class='alias' href='/ru/users/${author.login}/'>${author.alias}</a>`;

        if (author.fullname !== null) {
            authorCell.innerHTML += `<br> <a class='real_name' href='/ru/users/${author.login}/'>(${author.fullname})</a>`;
        }

        return authorCell;
    }

    getTitleCell() {
        let titleCell = document.createElement('td');
        titleCell.className = 'title';

        titleCell.innerHTML = `<p><a href='/ru/post/${this.bookmark.id}/'><h2>${this.bookmark.titleHtml}</h2></a></p>`;
        let introText = window._frt.stripTags(this.bookmark.leadData.textHtml)
            .trim()
            .replaceAll(/\n+/ig, '. ')
            .substring(0, 333);
        titleCell.innerHTML += `<p class='intro_text'>${introText}...</p>`;

        return titleCell;
    }

    getHubsCell() {
        let hubsCell = document.createElement('td');
        let hubList = document.createElement('ul');
        hubsCell.className = 'hubs';
        for (const hub of article.hubs) {
            let hubType = hub.type === 'corporative' ? 'company' : 'hub';
            hubList.innerHTML += `<li><i class="fas fa-tag"></i> <a href='/ru/${hubType}/${hub.alias}/'>${hub.title}</a></li>`;
        }
        hubsCell.appendChild(hubList);
        return hubsCell;
    }

    getStatsCell() {
        let statsCell = document.createElement('td');
        statsCell.className = 'stats';

        statsCell.innerHTML += `<i class="fas fa-comments"></i> ${this.bookmark.statistics.commentsCount} <br>`;
        statsCell.innerHTML += `<i class="far fa-bookmark"></i> ${this.bookmark.statistics.favoritesCount} <br>`;
        statsCell.innerHTML += `<i class="far fa-glasses"></i>  ${this.bookmark.statistics.readingCount} <br>`;
        statsCell.innerHTML += `<i class="fas fa-medal"></i>    ${this.bookmark.statistics.score} <br>`;
        statsCell.innerHTML += `<i class="fas fa-vote-yea"></i> ${this.bookmark.statistics.votesCount}`;

        return statsCell;
    }

    constructor(bookmark) {
        this.bookmark = bookmark;
    }
};

window.___frt.cls = class {
    /**
     * @param {Object[]} articles
     * @param {Number} page
     * @returns {Object[]}
     */
    static grabBookmarks(articles = [], page = 1) {
        let url = 'https://m.habr.com/kek/v2/articles/?user=ford153focus&user_bookmarks=true&fl=ru&hl=ru&page=' + page;
        let newArticles = window._frt.fetchSync(url, true);

        if (newArticles.articleIds.length > 0) {
            for (const articleId of newArticles.articleIds) {
                articles.push(newArticles.articleRefs[articleId]);
            }

            this.grabBookmarks(articles, ++page);
        } else {
            return articles;
        }
    }

    /**
     * @param {HTMLTableElement} table
     * @param {Object[]} bookmarks
     * @return void
     */
    static processBookmarks(table, bookmarks) {
        for (const bookmark of bookmarks) {
            let wrappedBookmark = new window.___frt.habr.bookmark.wrapper(bookmark);
            let row = document.createElement('tr');

            // row.appendChild(wrappedBookmark.getIdCell());
            row.appendChild(wrappedBookmark.getDateCell());
            row.appendChild(wrappedBookmark.getAuthorCell());
            row.appendChild(wrappedBookmark.getTitleCell());
            row.appendChild(wrappedBookmark.getHubsCell());
            row.appendChild(wrappedBookmark.getStatsCell());

            table.body.appendChild(row);
        }
    }

    constructor() {
        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/bootstrap/dist/css/bootstrap.css'});
        window._frt.Injectors.injectInternalScript(    {src:  '/node_modules/bootstrap/dist/js/bootstrap.bundle.js'});
        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/bootstrap/dist/css/bootstrap.css'});
        window._frt.Injectors.injectInternalStyleSheet({href: '/node_modules/@fortawesome/fontawesome-free/css/all.css'});

        let table = document.getElementById('fav_table');
        let bookmarks = this.grabBookmarks();
        this.processBookmarks(table, bookmarks);
        let favListEl = document.querySelector('.tm-articles-list');
        favListEl.insertBefore(table, favListEl.firstChild);
    }
};

// setTimeout(async () => {
//     window.___frt.habr.bookmark.obj = new window.___frt.habr.bookmark.cls();
// }, 5);

// document.querySelector('ul.content-list.shortcuts_items').style.display = 'none';
// document.querySelector('ul.arrows-pagination').style.display = 'none';
// document.getElementById('nav-pagess').style.display = 'none';
