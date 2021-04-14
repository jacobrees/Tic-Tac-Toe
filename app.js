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

let currentPlayer = 'x';

const switchPlayer = () => {
  if (currentPlayer === 'x') {
    currentPlayer = 'o';
  } else {
    currentPlayer = 'x';
  }
};

const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;

const playerMove = (square) => {
  square.addEventListener('click', (e) => {
    e.currentTarget.innerHTML = insertSymbol(currentPlayer);
    switchPlayer();
  });
};

const initialize = () => {
  squares.forEach((square) => {
    square.innerHTML = '';
    playerMove(square);
  });
};

initialize();
