if (!window._frt) window._frt = {};

window._frt.Bans = class {
    /**
     * @returns {string[]}
     */
    static get () {
        try {
            return JSON.parse(localStorage.bans);
        } catch (exception) {
            return [];
        }
    }

    /**
     * @param {string[]} bans
     */
    static set (bans) {
        let set = new Set(bans);
        let array = Array.from(set);
        localStorage.bans = JSON.stringify(array);
    }

    /**
     * @param {string} path
     */
    static add (path) {
        let bans = this.get();
        bans.push(path);
        this.set(bans);
        window._frt?.utils?.notify('Banned');
    }
};
