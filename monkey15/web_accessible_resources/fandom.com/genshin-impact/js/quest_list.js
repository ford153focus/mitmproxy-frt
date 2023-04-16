setTimeout(() => {
    const passed = [
        'A Short Encounter with a Rare Bird',
        'Adventure Takes Courage!',
        'Afratu\'s Dilemma',
        'An Unwavering Culinary Dream',
        'Blooming Sands',
        'Corps of Thirty Recruitment',
        'Cost-Effective Hook',
        'Courage is in the Heart',
        'Desert\'s Remembrance',
        'Dreams Beneath the Searing Sand',
        'Drusus\' Riddles',
        'Dual Evidence',
        'Even Beasts Stumble',
        'For a Dream I Tarry',
        'Giving Flowers',
        'Hidden Mercenaries',
        'Invisible Barrier',
        'Join the Eremites and Embrace a Wonderful New Life!',
        'Legends of the Stone Lock',
        'Lost in the Sands',
        'Memory\'s Final Chapter',
        'Soheil\'s Wish',
        'Static Views, Part 2',
        'Static Views',
        'The Exile: Sprouting',
        'The Foolish Fatuus',
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
        'Fatuous Farce',
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
