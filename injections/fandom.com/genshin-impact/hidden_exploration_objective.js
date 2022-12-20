let completed = [
    "Yasumoto's Last Notes",
];

[...document.querySelectorAll('ul > li > a')]
    .filter(el => completed.includes(el.innerText))
    .map(el => el.parentNode.style.backgroundColor = 'darkgreen');
