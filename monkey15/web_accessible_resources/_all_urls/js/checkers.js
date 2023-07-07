if (!window._frt) window._frt = {};

window._frt.Checkers = class {
    /**
     * @param {string} hostPattern
     * @returns {boolean}
     */
    static checkHost(hostPattern) {
        let pattern = new URLPattern({ hostname: hostPattern });
        return pattern.test(window.location.href);
    }

    /**
     * @param {string} pathPattern
     * @returns {boolean}
     */
    static checkPath(pathPattern) {
        let pattern = new URLPattern({ pathname: pathPattern });
        return pattern.test(window.location.href);
    }
}
