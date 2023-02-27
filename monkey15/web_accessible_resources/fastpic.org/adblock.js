for (let el of document.getElementsByTagName('div'))
{
    if (el.style.zIndex === '') continue;
    if (el.position !== 'fixed') continue;

    el.style.display = 'none';
}
