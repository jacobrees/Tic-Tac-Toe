const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');

const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('hide-menu');
};

player1Btn.addEventListener('click', () => {
  toggleMenu();
});

player2Btn.addEventListener('click', () => {
  toggleMenu();
});


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

const addImg = (e) => {
  const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;
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


const initialize = () => {
  const squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    square.innerHTML = '';
    playerMove(square, index);
  });
};

initialize();
