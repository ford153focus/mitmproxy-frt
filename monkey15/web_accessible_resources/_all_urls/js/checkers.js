if (!window._frt) window._frt = {};

window._frt.Checkers = class {
    static checkHost(hostPattern) {
        let pattern = new URLPattern({ hostname: hostPattern });
        return pattern.test(window.location.href);
    }

    static checkPath(pathPattern) {
        let pattern = new URLPattern({ pathname: pathPattern });
        return pattern.test(window.location.href);
    }
}
