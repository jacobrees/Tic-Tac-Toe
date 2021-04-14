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


const playerTurn = document.querySelector('.player-turn');

let currentPlayer = 'X';

const switchPlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }

  playerTurn.textContent = `Player ${currentPlayer} Turn`;
};


const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;


const fadeImg = (e) => {
  const img = e.currentTarget.firstChild;
  window.getComputedStyle(img).opacity; // eslint-disable-line
  img.style.opacity = 1;
};

const addImg = (e) => {
  e.currentTarget.innerHTML = insertSymbol(currentPlayer);
  fadeImg(e);
};

const playerMove = (square, index) => {
  square.addEventListener('click', (e) => {
    addImg(e);
    switchPlayer();

    console.log(index);
  }, { once: true });
};

const squares = document.querySelectorAll('.square');

const initialize = () => {
  squares.forEach((square, index) => {
    square.innerHTML = '';
    playerMove(square, index);
  });
};

initialize();
