const rows = 10;
const columns = 10;
const minesCount = 10;
const mines = [];

function plantMines() {
  for (let i = 0; i < minesCount; i += 1) {
    mines.push([Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)])
  }
  console.log(`Mines in ${mines}`);
}

function hasMine(row, col) {
  let mine = false;
  mines.forEach((m) => {
    if(m[0] === row && m[1] === col) {
      mine = true
    }
  });

  return mine;

}

function countNeighbornsMines(row, col) {
  let count = 0;
  if (hasMine(row-1, col - 1)) { count += 1; }
  if (hasMine(row-1, col)) { count += 1; }
  if (hasMine(row-1, col + 1)) { count += 1; }
  if (hasMine(row, col - 1)) { count += 1; }
  if (hasMine(row, col + 1)) { count += 1; }
  if (hasMine(row+1, col - 1)) { count += 1; }
  if (hasMine(row+1, col)) { count += 1; }
  if (hasMine(row+1, col+1)) { count += 1; }

  return count;
}


function openTile(tile){
  const row = parseInt(tile.dataset.row)
  const col = parseInt(tile.dataset.col)
  console.log(`click em row=${row} e col=${col}`)

  tile.classList.remove('unopened');

  if(hasMine(row, col)) {
    tile.classList.add('mine')
  } else {
    let count = countNeighbornsMines(row, col);
    if( count === 0 ) {
      tile.classList.add('opened')
    } else {
      tile.classList.add(`mine-neighbour-${count}`)
    }

  }
}

function grid() {
  const table = document.createElement('table');
  table.setAttribute('id', 'minesweeper')

  for(let i = 0; i < rows; i += 1){
    const row = document.createElement('tr');
    for(let j = 0; j < columns; j += 1){
      const tile = document.createElement('td')
      tile.classList.add('unopened');

      tile.dataset.row = i;
      tile.dataset.col = j;

      tile.addEventListener('click', (event) =>{
        openTile(event.currentTarget)
      })

      row.appendChild(tile);
    }
    table.appendChild(row)
  }
  return table
}

document.addEventListener('DOMContentLoaded', () => {
  plantMines();

  const game = document.getElementById('game')
  game.appendChild(grid());

})