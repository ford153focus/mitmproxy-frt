let table = document.getElementById('Current').parentElement.nextElementSibling;

for (let row of table.querySelectorAll('tr'))
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
