const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');
const menu = document.querySelector('.menu');

const toggleMenu = () => {
  menu.classList.toggle('hide-menu');
};

player1Btn.addEventListener('click', () => {
  toggleMenu();
});

player2Btn.addEventListener('click', () => {
  toggleMenu();
});

const squares = document.querySelectorAll('.square');

let currentPlayer = 'X';

const switchPlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const playerTurn = document.querySelector('.player-turn');


const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;

const playerMove = (square, index) => {
  square.addEventListener('click', (e) => {
    e.currentTarget.innerHTML = insertSymbol(currentPlayer);
    switchPlayer();
    playerTurn.textContent = `Player ${currentPlayer} Turn`;
    console.log(index)
  }, { once: true });
};

const initialize = () => {
  squares.forEach((square, index) => {
    square.innerHTML = '';
    playerMove(square, index);
  });
};

initialize();
