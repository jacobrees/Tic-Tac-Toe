let currentPlayer = 'X';

const switchPlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  const playerTurn = document.querySelector('.player-turn');
  playerTurn.textContent = `Player ${currentPlayer} Turn`;
};


const fadeImg = (e) => {
  const img = e.currentTarget.firstChild;
  window.getComputedStyle(img).opacity; // eslint-disable-line
  img.style.opacity = 1;
};

const winningPossibilities = [// eslint-disable-line
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8],
];

const xPlayerMoves = [];
const oPlayerMoves = [];

const playerMove = (e, index) => {
  const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;
  e.currentTarget.innerHTML = insertSymbol(currentPlayer);
  fadeImg(e);

  if (currentPlayer === 'X') {
    xPlayerMoves.push(index);
  } else {
    oPlayerMoves.push(index);
  }
};

const setBoard = (square, index) => {
  square.addEventListener('click', (e) => {
    playerMove(e, index);
    switchPlayer();
  }, { once: true });
};

const initialize = () => {
  const squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    square.innerHTML = '';
    setBoard(square, index);
  });
};

const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('hide-menu');
};

const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');

player1Btn.addEventListener('click', () => {
  toggleMenu();
  initialize();
});

player2Btn.addEventListener('click', () => {
  toggleMenu();
  initialize();
});
