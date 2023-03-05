if (!window._frt) window._frt = {};

window._frt.LibraryLoaders = class {
    static bootStrap() {
        _frt.Injectors.injectInternalStyleSheet({
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
            is_cdn: true,
        });

        _frt.Injectors.injectInternalScript({
            src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js',
            async: true,
            is_cdn: true,
        });
    }

    static fontAwesome() {
        _frt.Injectors.injectInternalStyleSheet({
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
            is_cdn: true,
        });
    }

    static jQuery() {
        if (typeof jQuery !== 'undefined') return;

        _frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_libs/jquery.js',
            async: true,
        });
    }

    static notyf() {
        _frt.Injectors.injectInternalStyleSheet({
            href: '/web_accessible_resources/_libs/notyf/notyf.min.css',
        });

        _frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_libs/notyf/notyf.min.js',
            async: true,
        });
    }

    static notify() {
        this.jQuery();

        setTimeout(() => {
            _frt.Injectors.injectScript({
                src: 'https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js',
                async: true,
            });
        }, 300); // need setTimeout to wait jquery load
    }
}
