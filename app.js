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


let xPlayerMoves = [];
let oPlayerMoves = [];

const logMove = (index) => {
  if (currentPlayer === 'X') {
    xPlayerMoves.push(index);
  } else {
    oPlayerMoves.push(index);
  }
};

const playerMove = (e, index) => {
  const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;
  e.currentTarget.innerHTML = insertSymbol(currentPlayer);
  fadeImg(e);
  logMove(index);
};

const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('hide-menu');
};

const testWinner = () => {
  let win = false;
  const checker = (arr, target) => target.every((v) => arr.includes(v));
  const winningPossibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8],
  ];

  winningPossibilities.forEach((array) => {
    if (checker(xPlayerMoves, array)) {
      console.log('xwin');
      win = true;
      toggleMenu();
    } else if (checker(oPlayerMoves, array)) {
      console.log('owin');
      win = true;
      toggleMenu();
    }
  });
  if (xPlayerMoves.concat(oPlayerMoves).length === 9 && !win) {
    console.log('draw');
    toggleMenu();
  }
};

const setBoard = (square, index) => {
  square.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    playerMove(e, index);
    testWinner();
    switchPlayer();
  }, { once: true });
};

const initialize = () => {
  currentPlayer = 'X';
  xPlayerMoves = [];
  oPlayerMoves = [];
  const squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    square.innerHTML = '';
    setBoard(square, index);
  });
};

const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');

player1Btn.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  toggleMenu();
  initialize();
});

player2Btn.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  toggleMenu();
  initialize();
});
