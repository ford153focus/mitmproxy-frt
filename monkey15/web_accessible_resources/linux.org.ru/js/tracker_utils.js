class TrackerUtils {
    /**
     * Hide banned topics on start
     */
    async hideTopics() {
        let hiddenTopics = await window._frt.utilslor.shared.getAllBannedTopics();

        for (const row of document.querySelectorAll('table.message-table tbody tr')) {
            let href = row.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href;
            let url = new URL(href);
            if (hiddenTopics.includes(url.pathname)) row.remove();
        }
    }

    /**
     * Ban selected topic
     * @param {MouseEvent} event Click-event of hiding button
     */
    hideTopic(event) {
        let row = event.target.parentElement.parentElement;
        let href = row.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href;
        let url = new URL(href);

        window._frt.utilslor.shared.saveBan(url.pathname);
        row.remove();
    }

    pickRandomTopic() {
        let topics = document.querySelectorAll('table.message-table tbody tr');
        let randomPickedNumber = Math.floor(Math.random()*topics.length);
        let randomPickedLink = topics[randomPickedNumber].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
        randomPickedLink.click();
    }

    /**
     * Draw action buttons
     */
    drawButtons() {
        for (const row of document.querySelectorAll('table.message-table tbody tr')) {
            let hideButton = document.createElement('button');
            // hideButton.type = 'button';
            hideButton.innerText = '♻';
            hideButton.onclick = this.hideTopic;

            let actionsCell = document.createElement('td');
            actionsCell.appendChild(hideButton);

            row.appendChild(actionsCell);
        }

        let randomPickButton = document.createElement('a');
        randomPickButton.className = 'btn btn-default';
        randomPickButton.innerHTML = 'Pick Random';
        randomPickButton.onclick = this.pickRandomTopic;
        document.querySelector('nav').appendChild(randomPickButton);
    }

    constructor() {
        this.hideTopics();
        this.drawButtons();
    }
}

setTimeout(() => {
    if (typeof window._frt.utilslor === 'undefined') window._frt.utilslor = {};
    window._frt.utilslor.tracker = new TrackerUtils();
}, 5);
