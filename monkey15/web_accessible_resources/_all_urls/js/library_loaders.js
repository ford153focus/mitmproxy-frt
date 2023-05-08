if (!window._frt) window._frt = {};

window._frt.LibraryLoaders = class {
    static bootStrap() {
        window._frt.Injectors.injectSheet({
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
        });

        window._frt.Injectors.injectScript({
            src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js',
            async: true,
        });
    }

    static fontAwesome() {
        window._frt.Injectors.injectSheet({
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
        });
    }

    static jQuery() {
        if (typeof jQuery !== 'undefined') return;

        window._frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_libs/jquery.js',
            async: true,
        });
    }

    static notyf() {
        window._frt.Injectors.injectInternalStyleSheet({
            href: '/web_accessible_resources/_libs/notyf/notyf.min.css',
        });

        window._frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_libs/notyf/notyf.min.js',
            async: true,
        });
    }

    static notify() {
        this.jQuery();

        setTimeout(() => {
            window._frt.Injectors.injectScript({
                src: 'https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js',
                async: true,
            });
        }, 300); // need setTimeout to wait jquery load
    }
};
