class Nuget {
    static getDownloads(pkg) {
        let download = pkg.querySelector('i.ms-Icon.ms-Icon--Download').parentElement.innerText;
        download = download.replace(/,/g, '');
        return parseInt(download);
    }

    /**
     * @returns {Element[]} Get packages on page as array
     */
    static getPackages() {
        let packages = document.querySelectorAll('article.package[role="listitem"]');
        return [...packages];
    }
}

class Sort {
    static byAuthor() {
        Nuget.getPackages()
            .sort((package1, package2) => {
                let author1 = package1.querySelector('span.package-by a').innerText;
                let author2 = package2.querySelector('span.package-by a').innerText;
                return author1.localeCompare(author2);
            })
            .map((node) => {
                document.querySelector('div.list-packages[role="list"]').appendChild(node);
            });
    }

    static byDownloads() {
        Nuget.getPackages()
            .sort((package1, package2) => {
                return Nuget.getDownloads(package2) - Nuget.getDownloads(package1);
            })
            .map((node) => {
                document.querySelector('div.list-packages[role="list"]').appendChild(node);
            });
    }

    static byName() {
        Nuget.getPackages()
            .sort((package1, package2) => {
                let title1 = package1.querySelector('a.package-title').innerText;
                let title2 = package2.querySelector('a.package-title').innerText;
                return title1.localeCompare(title2);
            })
            .map((node) => {
                document.querySelector('div.list-packages[role="list"]').appendChild(node);
            });
    }
}

let script = document.createElement('script');
script.textContent = `${Nuget.toString()}\n${Sort.toString()}`;
document.documentElement.appendChild(script);

document.querySelector('.cell-controls').innerHTML += `
    <span>
        Sort by:
        <a href="#" class="sorter author" onclick="Sort.byAuthor();">author</a>
        <span>|</span>
        <a href="#" class="sorter downloads" onclick="Sort.byDownloads();">downloads</a>
        <span>|</span>
        <a href="#" class="sorter name" onclick="Sort.byName();">name</a>
    </span>
`;
