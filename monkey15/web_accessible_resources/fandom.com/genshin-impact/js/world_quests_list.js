// noinspection SpellCheckingInspection

setTimeout(() => {
    const passed = [
        'A Short Encounter with a Rare Bird',
        'Adventure Takes Courage!',
        'Afratu\'s Dilemma',
        'An Artist Adrift',
        'An Introduction to Indoor Archaeology',
        'An Unwavering Culinary Dream',
        'Awaken the Residual Pari in the Fravashi Trees',
        'Behold, the Sign Comes Like A Thief...',
        'Blooming Sands',
        'Corps of Thirty Recruitment',
        'Cost-Effective Hook',
        'Courage is in the Heart',
        'Desert\'s Remembrance',
        'Dreams Beneath the Searing Sand',
        'Drusus\' Riddles',
        'Dual Evidence',
        'Even Beasts Stumble',
        'For Her Judgment Reaches to the Skies...',
        'For a Dream I Tarry',
        'Giving Flowers',
        'Hidden Mercenaries',
        'Invisible Barrier',
        'Join the Eremites and Embrace a Wonderful New Life!',
        'Legends of the Stone Lock',
        'Lost in the Sands',
        'Make Bright the Arrows, Gather the Shields...',
        'Memory\'s Final Chapter',
        'Monumental Study',
        'Pale Fire',
        'Soheil\'s Wish',
        'Static Views',
        'Static Views, Part 2',
        'The Exile: Sprouting',
        'The Foolish Fatuus',
        'The Hymn of Tir Yazad',
        'The Path of Papers',
        'The Price',
        'Until Vana is Healed',
        'Varuna Gatha',
        'Vimana Agama: Dev Delver Chapter',
        'Vimana Agama: First Chapter',
        'Vimana Agama: Jazari\'s Chapter',
        'Vimana Agama: Royinjan\'s Chapter',
        'Where Are the Fierce Creatures?',
    ];

    let weekly = [
        'Amir\'s Raw Meat Commission',
        'Arayesh\'s Jam',
        'Arina\'s Nilotpala Lotuses',
        'Dwarkanath\'s White Iron Chunks',
        'Fatuous Farce',
        'Fungal Fracas',
        'Hilichurl Hullaballoo',
    ];

    for (const el of document.querySelectorAll('td')) {
        if (passed.includes(el.innerText)) {
            el.parentElement.style.setProperty('background-color', 'darkgreen', 'important');
        }

        if (weekly.includes(el.innerText)) {
            el.parentElement.style.setProperty('background-color', 'darkred', 'important');
        }
    }
}, 153);
