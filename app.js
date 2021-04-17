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
}

const playerMove = (e, index) => {
  displaySymbol(e)
  logMove(index);
};

const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('hide-menu');
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


const testWinner = () => {
  let win = false;
  const checker = (arr, target) => target.every((v) => arr.includes(v));
  const winningPossibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8],
  ];

  winningPossibilities.forEach((array) => {
    if (checker(xPlayerMoves, array)) {
      win = true;
      toggleResult("'X' WINS");
      setTimeout(() => { toggleMenu(); }, 100);
    } else if (checker(oPlayerMoves, array)) {
      win = true;
      toggleResult("'O' WINS");
      setTimeout(() => { toggleMenu(); }, 100);
    }
  });
  if (xPlayerMoves.concat(oPlayerMoves).length === 9 && !win) {
    toggleResult('DRAW');
    setTimeout(() => { toggleMenu(); }, 100);
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
  displayPlayerTurn.textContent = `Player '${currentPlayer}' Turn`;
  const squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    square.style.cursor = 'pointer';
    square.innerHTML = '';
    setBoard(square, index);
  });
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
