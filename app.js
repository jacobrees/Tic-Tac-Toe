let currentPlayer = 'X';

const displayPlayerTurn = document.querySelector('.player-turn');

const switchPlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  displayPlayerTurn.textContent = `Player '${currentPlayer}' Turn`;
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

const displaySymbol = (e) => {
  e.currentTarget.style.cursor = 'default';
  const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;
  e.currentTarget.innerHTML = insertSymbol(currentPlayer);
  fadeImg(e);
};

const playerMove = (e, index) => {
  displaySymbol(e);
  logMove(index);
};

const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  const html = document.querySelector('html');
  menu.classList.toggle('hide-menu');
  html.classList.toggle('enable-scroll');
};

const toggleResult = (result) => {
  const resultContent = document.querySelector('.result-content');
  if (result) {
    resultContent.textContent = result;
  }
  const resultMenu = document.querySelector('.result-menu');
  resultMenu.classList.toggle('show-result');
};

const mainMenuBtn = document.querySelector('.main-menu-btn');

mainMenuBtn.addEventListener('click', () => {
  toggleResult();
});

let win = false;

const testWinner = () => {
  const checker = (arr, target) => target.every((v) => arr.includes(v));
  const winningPossibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8],
  ];

  winningPossibilities.some((array) => { // eslint-disable-line
    if (checker(xPlayerMoves, array)) {
      win = true;
      toggleResult("'X' WINS");
      setTimeout(() => { toggleMenu(); }, 100);
      return true;
    } if (checker(oPlayerMoves, array)) {
      win = true;
      toggleResult("'O' WINS");
      setTimeout(() => { toggleMenu(); }, 100);
      return true;
    }
  });
  if (xPlayerMoves.concat(oPlayerMoves).length === 9 && !win) {
    toggleResult('DRAW');
    setTimeout(() => { toggleMenu(); }, 100);
  }
};

const squares = document.querySelectorAll('.square');
let players;
const minimax = () => {
  const possibleMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((val) => !xPlayerMoves.concat(oPlayerMoves).includes(val)); // eslint-disable-line
  return possibleMoves[0];
};

const toggleBoardPointerEvents = () => {
  squares.forEach((btn) => {
    btn.classList.toggle('disable-click');
  });
};

const setBoard = (square, index) => {
  square.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    playerMove(e, index);
    testWinner();
    switchPlayer();
    if (currentPlayer === 'O' && players === 1 && xPlayerMoves.concat(oPlayerMoves).length !== 9 && win === false) {
      toggleBoardPointerEvents();
      setTimeout(() => { squares[minimax()].click(); toggleBoardPointerEvents(); }, 500);
    }
  }, { once: true });
};

let xIsFirst = true;

const setFirstPlayer = () => {
  if (xIsFirst) {
    currentPlayer = 'X';
  } else {
    currentPlayer = 'O';
  }
  xIsFirst = !xIsFirst;
};

const initialize = (numberOfPlayers) => {
  players = numberOfPlayers;
  setFirstPlayer();
  xPlayerMoves = [];
  oPlayerMoves = [];
  win = false;
  displayPlayerTurn.textContent = `Player '${currentPlayer}' Turn`;
  squares.forEach((square, index) => {
    square.style.cursor = 'pointer';
    square.innerHTML = '';
    setBoard(square, index);
  });
};

const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');

player1Btn.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  toggleMenu();
  initialize(1);
  if (currentPlayer === 'O') {
    toggleBoardPointerEvents();
    setTimeout(() => { squares[minimax()].click(); toggleBoardPointerEvents(); }, 500);
  }
});

player2Btn.addEventListener('click', () => {
  toggleMenu();
  initialize(2);
});
