/* eslint-disable quotes */
// noinspection SpellCheckingInspection

// ==UserScript==
// @author       ford153focus
// @description  FandomWiki :: Genshin :: Mark completed achievements
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fandom.com
// @match        https://genshin-impact.fandom.com/wiki/Wonders_of_the_World
// @name         FandomGenshinAchievements
// @namespace    frt
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/ford153focus/mitmproxy-frt/master/monkey15/web_accessible_resources/fandom.com/genshin-impact/js/wonders_of_the_world.js
// @version      23.7.4
// ==/UserScript==

setTimeout(() => {
    /** @type {string[]} */
    let completed = [
        "...And Her Name Is the Mary Celeste",
        "...And I Would Walk 3,000 More",
        "...I'm Sorry, Sir, But You're Ineligible",
        "...Let Me Fade With Memory",
        "...Or a New Storm?",
        "...You could hear Paimon all along, couldn't you?",
        "A Cat's Gift",
        "A Conversation with the Treasure Chest Owner",
        "A Distant Sea Shepherd's Treasure",
        "A Doctor's Odyssey",
        "A Fascinating Journey",
        "A Former Dream",
        "A Hollow Soul",
        "A House Ill-Founded",
        "A Leisurely Journey",
        "A Mermaid's Tale",
        "A New Star Approaches",
        "A Nourishing Friendship",
        "A Once-Emerald Nursery",
        "A Question of Diet",
        "A Rope Over an Abyss",
        "A Tale of Two Cities",
        "A Very Long Engagement",
        "A Walnut Tree Amidst the Gardens",
        "A Well-Trained Archaeologist",
        "Across the Misty River",
        "Aha! What's on the Hook?",
        "Akasha Pulses, the Kalpa Flame Rises",
        "All Dreams Must End With an Awakening",
        "All's Well That Ends Well",
        "Answer Time",
        "As You Wish",
        "As the Lion Searched for Courage...",
        "Autumn Winds, Scarlet Leaves",
        "Back With the Wind",
        "Basically Harmless",
        "Before My Time	People don't want to mention his name, nor do want to remember his words or deeds.",
        "Beginner's Luck",
        "Beloved of the Anemo Archon",
        "Beneath the Fog",
        "Beware of Angry Dog",
        "Bifröst",
        "Bio-Oceanic Weapon",
        "Birth Pains of the Dark Fog",
        "Blade of Tatara",
        "Boared to Death",
        "Bon Appétit",
        "Boom Shaka-Laka, More Boom-Shaka-Laka",
        "CREDE TENEBRIS",
        "Call of the Nameless City",
        "Caribert",
        "Cat in the Clouds",
        "Causality of Birth and Extinction",
        "Cecilia Garden",
        "Chill Out!",
        "Close Encounters of the Which Kind?",
        "Core Breakthrough",
        "Core Meltdown",
        "Could All Uninvolved Machinery Please Leave Immediately?",
        "Create, Swap, Store, and Use",
        "Crouching Dragon, Hidden Chi",
        "Date of Departure",
        "Davy Jones' Locker",
        "Deflection!",
        "Den of Thieves",
        "Derailed",
        "Desert Raider",
        "Didn't Even Need a Manual...",
        "Dolorous Stroke",
        "Don't Blame the Mora!",
        "Dreams, Emptiness, Deception",
        "Drifting in the Wind",
        "Dry Clean",
        "Duel Before the Throne",
        "Déjà Vu!",
        "Encore!",
        "Engraved",
        "Eremitis ne credite",
        "Eternal Sustenance",
        "Even Paimon Wouldn't Eat That!",
        "Ever an Outcast in the Forest",
        "Exploration in the Desert",
        "Explorer",
        "Fantabulous Firework Fiesta",
        "Fantastic Four",
        "Farewell, Archaic Lord",
        "Fata Morgana",
        "Fight Fire With Fire",
        "Final Farewell",
        "Fine, I'll Do It Myself",
        "Flat Out",
        "Flowing Sunfire, Also Known as Marishi",
        "For Meritorious Service",
        "For a Tomorrow Without Tears",
        "For the Love of Godwin",
        "Force Field Erosion",
        "Friends the World Over",
        "From Soil You Are, and to the Sand You Shall Return...",
        "Futile Endeavor",
        "Gears of Destiny",
        "Genesis of the Rift",
        "Glacial Steel",
        "Glittering Melody",
        "Glutton for Goulash",
        "Golden Gliding License",
        "Great Amakumo Peak",
        "Guess Who?",
        "Guessing Game",
        "Hard Landing",
        "He Who Controls the Spice...",
        "Hello...! Anyone in here...?",
        "Her and Her Cat",
        "Hero-in-Training",
        "Hidden Palace of Guizang Formula",
        "Hidden Palace of Zhou Formula",
        "Hiiragi Sanjuuro",
        "Hilichurl Champion",
        "Homeward-Bound Spirits",
        "How Do You Write The Excavation Report?",
        "Hunter's Mercy",
        "I'll Let You Off... This Time",
        "Icing on the Slime",
        "Icy Rivers, Crimson Witch",
        "If I Run Fast Enough...",
        "If Not Us, Then Who?",
        "Illustrious in Inazuma",
        "Impeccable Judgment",
        "In Her Full Glory...",
        "In This Solemn Matter Let No One Interfere!",
        "In the Name of Anfortas",
        "Initiating Warp Drive!",
        "Interview With a Bygone God",
        "Inugami's End",
        "It All Comes Tumbling Down",
        "It Has to Be Treasure",
        "It's Bigger on the Inside",
        "It's Yesterday Once More",
        "It's the Same As Having Wings",
        "Iwakura Out",
        "Jack of No Trades",
        "Jackpot",
        "Jailhouse Fiesta",
        "Juggernaut",
        "Kalimi's Fungus",
        "Kannazuka Battle Plan",
        "Kara's Child",
        "King Deshret and the Three Magi",
        "Knighthood Excellence",
        "Knights and Their Knotty Issues",
        "Knock Knock",
        "Knockout",
        "La Luna Rossa",
        "Layers of Fear",
        "Legend in Liyue",
        "Let the Wind Lead",
        "Level Up",
        "Light Up the Dark",
        "Light Up the Fog",
        "Light and Dark, Dusk and Dawn",
        "Lily Loves Music",
        "Long John Silver",
        "Love Is All Around",
        "Love and Non-Communication",
        "Maintain Safety Distance",
        "Majesty of the Deep",
        "Making Do",
        "Master Chef: Vanarana",
        "May Glory Go With You",
        "Meal For Two",
        "Megastar in Mondstadt",
        "Mighty and Illuminated Wave Rider",
        "Moshiri Kara",
        "Music of the Forest",
        "N-Thousand Leagues Under the Sea",
        "Nanomachines, Son!",
        "Nature's Infinite Wit",
        "Nice Boat!",
        "Nihil Sub Caligine Novum",
        "No Way Home",
        "None Stand Secure",
        "Not for Long-Term Consumption",
        "Nothing to Lose But Time",
        "Now Let Time Resume",
        "Of Heart and Soul",
        "Of Sun and Moon",
        "Of the Land Amidst Monoliths",
        "Oh, Frabjous Day!",
        "Omamori, Justice, Number One",
        "Omnipresence Over Mortals",
        "On the Other Side of Homesickness",
        "One Flew Over the Sick Men's Rest",
        "One Key for Each Lock",
        "Open Sesame!",
        "Outlander Vs. Outlander",
        "Outlandish Behavior",
        "Overflowing Light",
        "Overlooking View",
        "Paimon's Lucky Day!",
        "Palace in a Pool",
        "Parvezravan Khwarrah",
        "Penalty",
        "People of the Valley of Life",
        "Perched Between Dream and Reality",
        "Pirates! Argh!",
        "Please Play Safely",
        "Poet Vs. Paycheck",
        "Portal of Marvels",
        "Prelude to the Journey",
        "Priest, Princess, and Scribe",
        "Prodigal Son's Return",
        "Purveyor of Punishment",
        "QUEST CLEAR",
        "Quick As Lightning",
        "Ready Player Zero",
        "Ready, Fight!",
        "Reclining on Top of the World",
        "Records of the Fall",
        "Respecting Cultural Heritage",
        "Rest in Peace",
        "Revolutionary Outlander",
        "Ride the Lightning",
        "Rise and Shrine",
        "Rise of the Jade Chamber",
        "SHUUMATSU GAIDEN",
        "SWORDFISH II",
        "Samurai Gourmet",
        "Samurice",
        "Scarlet Reign's Great Red Sand",
        "Scholarly Pretensions",
        "Scourge of the Battlefield",
        "Sea of Puzzles",
        "Second Blooming",
        "Seven Dish Dance",
        "Seven Letters",
        "Shadow Over Luhua Pool",
        "Shocking... Positively Shocking",
        "Silence, You Raving Lunatic",
        "Silly-Billy Churlish Ghoul",
        "Sky High",
        "Sky's the Limit",
        "Smells like Animal Spirit!",
        "Sneering at the Power of the Gods",
        "Snow-Stored History",
        "Soaring in the Skies of Sary-Ozek",
        "Song of Night and Dawn",
        "Song of the Dragon and Freedom",
        "Star-Crossed Night",
        "Step Right Up!",
        "Sternest of Souls",
        "Stillness, the Sublimation of Shadow",
        "Stop It, Mr. Robot!",
        "Sumeru Monster Ecology Survey",
        "Swift as the Wind",
        "Swordseeker",
        "Thank You, Come Again",
        "That Smells Divine",
        "The Alchemistake",
        "The Amazing Pyramid",
        "The Ancient Orchard and Spring",
        "The Aspirations of All",
        "The Bandit, the Lunatic, and the Pitch-Black Enigma",
        "The Beautiful and Damned",
        "The Best Sword in the Cemetery",
        "The Bigger They Are...",
        "The Bitter Fruit of Dreams",
        "The Bleak Midwinter",
        "The Breakthrough",
        "The Chasm Mining Records",
        "The Children of God Shall Dance",
        "The Crane Returns on the Wind",
        "The End of Annihilation",
        "The End of the Beginning",
        "The End of the Corridor",
        "The Far Side of Fate",
        "The Flavor of Déjà Vu",
        "The Forest Will Remember",
        "The Gathering Storm",
        "The God Gazes Back",
        "The House of Canned Time",
        "The Hunter Becomes the Hunted",
        "The Ill-Starred Legacy of Iwakura",
        "The Illusory City",
        "The Immovable God and the Eternal Euthymia",
        "The Invisible Hand",
        "The Jasmines Whisper, the Pomegranates Are Glad",
        "The King of Four Lands",
        "The Lengthy Reunion",
        "The Long Goodbye",
        "The Longest Day",
        "The Lost Valley",
        "The Loveless Tarantula",
        "The Merchant and the Gate of Knowledge",
        "The Millelith Shall Never Be Moved",
        "The Morn a Thousand Roses Brings",
        "The Mushroom That Asks Too Much",
        "The Nameless City's Past",
        "The Net Closes In",
        "The Nine-Word Rumor",
        "The Outlander Who Caught the Wind",
        "The PRISM Program",
        "The Path To Enlightenment",
        "The Perfect Sandstorm",
        "The Princess Behind the Curtain",
        "The Rain Seeps Into the Soil",
        "The Random Circumstances of a Rose's Blooming",
        "The Remains of the Gale",
        "The Rule of Three",
        "The Ship Has It",
        "The Sickness Unto Near-Death",
        "The Silent, Dreamless Paradise",
        "The Sky is Vast; The Earth...",
        "The Soul Transposed",
        "The Straight Path",
        "The Stranding of the Beagle",
        "The Tale of the Forest",
        "The Will to Live and the Depths of Lamentation",
        "Their Wishes",
        "They Shall Not Grow Old",
        "Thinking Like a Vahumana Scholar",
        "This Novel Is Amazing!",
        "This and That...",
        "Though Their Wishes Be Like Morning Dew...",
        "Though to the Earth I May Return...",
        "Three Strikes",
        "Through Mists of Smoke and Forests Dark",
        "Through Pass",
        "Through the Storm",
        "Thunder Fall",
        "Thunderbird's Lineage",
        "Ticked, Tacked, and Towed",
        "To Brave the Lightning's Glow",
        "Today, This Seal — Tomorrow, Watatsumi Island!",
        "Touch and Go",
        "Towering Achievement",
        "Transmutation Nuclide",
        "Traverse the Fog Door",
        "Trees Should Blend Their Roots and Shade, for That Is Where the Home Is Made",
        "Triumph of the Imagination",
        "Underground... Overrated?",
        "Untellable Tale",
        "Use the Force, Sorush",
        "Vamadha-Go-Round",
        "Victory Road",
        "Voice of Akasha",
        "Walk Like King Deshret's People",
        "Walking with Water and Wind",
        "We Will Be Reunited",
        "Weather Control Activated",
        "Well Done, Stierlitz!",
        "What Difference Does This Make?",
        "What Does This Button Do?",
        "What's the Password?",
        "When Autumn and Dew Meet",
        "When One Gazes Into the Abyss...",
        "When the Dark Sun Passes",
        "When the Dreams Bloom",
        "When the Red Scarf Transforms Into a Bird in Flight...",
        "Where Fate Comes to a Crossroads",
        "Where Have You Gone, My Dream?",
        "White's Illusion",
        "Who Let the Dogs Out",
        "Why We Fight",
        "Winds Change Their Course",
        "Winter Wonderland",
        "Wrath of the Gods",
        "Yamada Go's Wooden Mallet",
        "Yet the Darkness Did Not Overcome It...",
        "Yo-Ho-Ho, and a Bottle of Dandelion Wine",
        "You Can Have Those Back!",
        "You Can't Help Your Feelings",
        "You Should Start A Doushin Dojo",
        "\"...A Single Night's Work\"",
        "\"...Anyone can be a gourmet.\"",
        "\"...For She Shall Surely Requite.\"",
        "\"...Lizard-Spock\"",
        "\"...Not indicative of final product\"",
        "\"...Shew the Kingdoms Thy Shame.\"",
        "\"...Smells Like Asphalt.\"",
        "\"...Till Debt Do Us Part\"",
        "\"All We Need Is Some Firewood and Some Vinegar...\"",
        "\"All is Well\"",
        "\"Extensive And Meticulous\"",
        "\"Get Over Here!\"",
        "\"Han Always Shoots First...\"",
        "\"I Hate 'Em Myself!\"",
        "\"I am a cat named Neko.\"",
        "\"I've Got It! I've Got It!\"",
        "\"If They Had Known the Unseen...\"",
        "\"If Tokoyo Ookami Knew of This...\"",
        "\"If you put your heart into it...\"",
        "\"It's My Job.\"",
        "\"It's Only an Eternity of Servitude!\"",
        "\"Knee-Deep Snow...\"",
        "\"Kujirai Art, Temari Jutsu\"",
        "\"Lovely Sights, Further Than the Eye Can See\"",
        "\"Maybe Get Yourself a More Social Hobby...\"",
        "\"Melting... Away...\"",
        "\"My Life as an Adventurer\"",
        "\"Not Flyin' Away This Time!\"",
        "\"Oh, so That's How You Fish...\"",
        "\"P—Paimon ate it...\"",
        "\"Seeds of Stories, Brought by the Wind...\"",
        "\"Sorry for the Trouble!\"",
        "\"Take That, You Overblown Mist Flower!\"",
        "\"That Was Blooming Hot\"",
        "\"That's one big Crystalfly\"",
        "\"The Eel in Winter Sought\"",
        "\"This Mystery Is Solved!\"",
        "\"Unmatched Throughout Tokoyo\"",
        "Burned Yourself, Did You?",
    ];


    for (const el of document.querySelectorAll('table > tbody > tr')) {
        let name = el.querySelector('td:nth-child(1) a')?.innerText;
        if (completed.includes(name)) el.classList.add('completed');
        if (completed.includes(name)) el.style.backgroundColor = '#090';
    }
}, 153);
