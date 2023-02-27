class AvitoFilterUtility {
    constructor() {
        this.adverts = document.querySelectorAll('[itemtype="http://schema.org/Product"]');

        this.path = window.location.pathname.split('/');

        if (this.path.includes('sdam') && (this.path.includes('komnaty') || this.path.includes('kvartiry'))) {
            this.flatsFilter();
        } else if (this.path.includes('kvartiry') && this.path.includes('prodam')) {
            //this.badAgencyFilter();
        } else {
            this.filterByTitleAndDesc();
        }
    }

    filterByTitleAndDesc() {
        let filters = [
            'запчасти',
            'не рабо',
            'нерабо',
            'разбит',
            'не включается',
            'под восстановление'
        ];

        if (this.path.includes('tovary_dlya_kompyutera') && this.path.includes('klaviatury_i_myshi')) {
            filters.push([/^Наклейка для/i, /^Клавиатур([аы])( для)? (нетбук(а|ов)|ноутбук(а|ов))/i]);
        } else if (this.path.includes('telefony')) {
            filters.push([/^чехол/i, /запчаст/i, /разбор/i, /зап\.ч/i, /з\.ч\./i, /з\/ч/i, /на детали/i]);
        } else if (window.location.pathname.includes('tovary_dlya_kompyutera/klaviatury_i_myshi')) {
            filters.push(['ноутбу']);
        }

        if (this.path.includes('velosipedy_i_samokaty')) {
            filters.push('гироскутер');
        }

        if (this.path.includes('noutbuki')) {
            filters.push('запчаст');
            filters.push('на детали');
            filters.push('по частям');
            filters.push('не включается');
            filters.push('разбор');
            filters.push('з.ч');
            filters.push('з/ч');
            filters.push('зап.ч');
        }

        if (this.path.includes('planshety_i_elektronnye_knigi')) {
            filters.push('не загружается');
            filters.push('графически');
        }

        if (window.location.pathname.includes('televizor')) {
            filters.push('полос', 'матриц', 'тресну');
        }

        for (let advert of this.adverts) {
            let advertTitle = advert.querySelector('[itemprop="name"]');
            let advertTitleText = advertTitle.innerHTML.replaceAll('&nbsp;', ' ').trim().toLowerCase();

            let advertDesc = advert.querySelector('[class^="iva-item-description"]');
            let advertDescText = advertDesc.innerText.replaceAll('&nbsp;', ' ').trim().toLowerCase();

            for (let filter of filters) {
                if (advertDescText.includes(filter))  advert.remove();
                if (advertTitleText.includes(filter)) advert.remove();

                if (advertDescText.search(filter) > -1)  advert.remove();
                if (advertTitleText.search(filter) > -1)  advert.remove();
            }
        }
    }

    flatsFilter() {
        // noinspection MagicNumberJS
        const maxAllowedCommission = 999;

        // noinspection MagicNumberJS
        const maxAllowedDistance = 2.0;

        for (let advert of this.adverts) {
            /**
             * Too high commission filter
             */
            (() => {
                let commision = advert.querySelector('span[class^="price-root-"]:last-child');
                if (!commision) return;
                commision = parseInt(commision.innerText);
                if (isNaN(commision)) return;
                if (commision > maxAllowedCommission) advert.style.display = 'none';
            })();

            /**
             * To metro distance filter
             */
            (() => {
                let distance = advert.querySelector('div[class^="geo-georeferences"] span:last-child');
                if (!distance) return;
                distance = distance.innerText.toLocaleLowerCase().replace(',', '').replace(',', '.').trim();
                if (!distance.includes('км')) return;
                if (parseFloat(distance) > maxAllowedDistance) advert.style.display = 'none';
            })();

            /**
             * Nationalism Filter
             */
            (() => {
                let description = advert.querySelector('div[class^="iva-item-description"]');
                if (!description) return;
                description = description.innerText.toLocaleLowerCase();
                if (description.includes('славян')) advert.style.display = 'none';
                if (description.includes('русск'))  advert.style.display = 'none';
            })();
        }
    }
}

setTimeout(() => {
    let button = document.createElement('button');
    button.type = 'button';
    button.id = 'remove_broken';
    button.innerText = 'Remove broken';
    button.onclick = () => { window.___frt.filter = new AvitoFilterUtility(); };
    document.body.insertAdjacentElement('beforeend', button);
}, 531);

if (!window.___frt) window.___frt = {};
