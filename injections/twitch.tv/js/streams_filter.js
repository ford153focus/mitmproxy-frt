let unwantedGames = [
    'Casino',
    'Just Chatting',
    'Poker',
    'Slots',
    'Virtual Casino'
];

let unwantedStreamNames = [
    'казино',
    'слоты'
];

setInterval(() => {
    let streams = document.querySelectorAll('div.tw-tower > div');
    streams = Array.from(streams);
    streams.shift(); //1st element is not stream

    for (const stream of streams) {
        let streamName = stream.querySelector('h3')?.innerText?.toLowerCase();
        let gameName = stream.querySelector('a[data-a-target="preview-card-game-link"]')?.innerText;

        if (streamName===undefined) continue;
        if (gameName===undefined) continue;

        if (unwantedGames.includes(gameName)) stream.remove();

        for (const unwantedStreamName of unwantedStreamNames) {
            if (streamName.includes(unwantedStreamName)) {
                stream.remove();
            }
        }
    }
}, 5310);
