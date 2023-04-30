setTimeout(() => {
    let table = document.getElementById('Current').parentElement.nextElementSibling;
    let rows = table.querySelectorAll('tr');

    for (let row of rows)
    {
        for (let cell of row.querySelectorAll('td'))
        {
            if (cell.innerText === 'Web, Submission')
            {
                row.style.backgroundColor = 'darkred';
            }

            if (cell.innerText === 'In-Game, Battle Pass')
            {
                row.style.backgroundColor = 'darkred';
            }

            if (cell.innerText === 'In-Game, Test Run')
            {
                row.style.backgroundColor = 'darkorange';
            }
        }
    }
}, 153);
