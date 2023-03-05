// noinspection SpellCheckingInspection

let completed = [
    "Akashi's Archery Challenge",
    "Buried Chests in Ashavan Realm",
    "Chessboard of Safhe Shatranj",
    "Chouji's Travels",
    "Cryptic Message in Dragonspine",
    "Cryptic Message in Sumeru",
    "Dragonspine's Glacial Secret",
    "Dragonspine's Last Trio",
    "Drusus's Riddles",
    "Eleazar Hospital Notes",
    "Fatui Action Logs",
    "For a Rose's Wellbeing",
    "Fourth's a Deathmatch",
    "Hanayama Kaoru's Flowery Plan",
    "Ishine Script Deciphering",
    "Iwakura Art's Downfall",
    "Khayyam's Final Words",
    "Lumenspar in the Den of Thieves",
    "Marana's Last Struggle",
    "Memories of Pairidaeza",
    "Muning's Never-Ending Needs",
    "Opening Old Memories",
    "Pay Your Respects",
    "Put Them To Rest",
    "Ragged Records",
    "Rinzou's Treasure",
    "Searching for Saimon Jirou",
    "Seed from the Valley of Life",
    "Selling the Dragonbone Orb",
    "Sunchildren Hide and Seek",
    "The Bad Guy in Vimara Village",
    "The Cat's Affection",
    "The Dead End and the Glinting Architects",
    "Washizu's Prayers",
    "Yasumoto's Last Notes",
    "\"Boatman\"'s Task",
];

[...document.querySelectorAll('ul > li > a')]
    .filter(el => completed.includes(el.innerText))
    .map(el => el.parentNode.style.backgroundColor = 'darkgreen');
