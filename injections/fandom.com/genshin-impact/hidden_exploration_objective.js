let completed = [
    "\"Boatman\"'s Task",
    "Akashi's Archery Challenge",
    "Chouji's Travels",
    "Cryptic Message in Dragonspine",
    "Dragonspine's Glacial Secret",
    "Dragonspine's Last Trio",
    "Drusus's Riddles",
    "Eleazar Hospital Notes",
    "Fatui Action Logs",
    "Ishine Script Deciphering",
    "Khayyam's Final Words",
    "Lumenspar in the Den of Thieves",
    "Marana's Last Struggle",
    "Opening Old Memories",
    "Pay Your Respects",
    "Put Them To Rest",
    "Ragged Records",
    "Rinzou's Treasure",
    "Seed from the Valley of Life",
    "Sunchildren Hide and Seek",
    "The Bad Guy in Vimara Village",
    "The Cat's Affection",
    "Yasumoto's Last Notes",
];

[...document.querySelectorAll('ul > li > a')]
    .filter(el => completed.includes(el.innerText))
    .map(el => el.parentNode.style.backgroundColor = 'darkgreen');
