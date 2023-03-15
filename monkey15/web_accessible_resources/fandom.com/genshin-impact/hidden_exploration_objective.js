// noinspection SpellCheckingInspection

let completed = [
    "Tatarigami Investigation Expedition",
    "A Gift To Shitoki, Wrapped In Conches",
    "Abe's Fungi Needs",
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
    "Even Beasts Get Homesick",
    "Fatui Action Logs",
    "For a Rose's Wellbeing",
    "Fourth's a Deathmatch",
    "Hanayama Kaoru's Flowery Plan",
    "Ipe's Fishing Advice",
    "Ishine Script Deciphering",
    "Iwakura Art's Downfall",
    "Khayyam's Final Words",
    "Kito and Kina's Request",
    "Komaki's Spiritherb Fortune",
    "Lumenspar in the Den of Thieves",
    "Marana's Last Struggle",
    "Memories of Pairidaeza",
    "Muning's Never-Ending Needs",
    "Nonno's Hide And Seek",
    "Opening Old Memories",
    "Pay Your Respects",
    "Put Them To Rest",
    "Ragged Records",
    "Rero's Joke",
    "Rinzou's Treasure",
    "Searching for Saimon Jirou",
    "Seed from the Valley of Life",
    "Selling the Dragonbone Orb",
    "Sunchildren Hide and Seek",
    "The Bad Guy in Vimara Village",
    "The Cat's Affection",
    "The Dead End and the Glinting Architects",
    "The Foxes' Affection",
    "Una's Longing",
    "Washizu's Prayers",
    "Yasumoto's Last Notes",
    "\"Boatman\"'s Task",
];

[...document.querySelectorAll('ul > li > a')]
    .filter(el => completed.includes(el.innerText))
    .map(el => el.parentNode.style.backgroundColor = 'darkgreen');
