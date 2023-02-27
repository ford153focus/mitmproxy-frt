setInterval(() => {
    for (const el of document.querySelectorAll('textarea[placeholder="Leave a reply..."]')) {
        if (el.___frt_patched) continue;

        el.addEventListener('keyup', () => {
            el.style.height = el.value ? `${el.scrollHeight + 5}px` : 'auto';
        });

        el.___frt_patched = true;
    }
}, 1530);
