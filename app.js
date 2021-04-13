const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');
const menu = document.querySelector('.menu');

player1Btn.addEventListener('click', () => {
  menu.classList.toggle('hide-menu');
});

player2Btn.addEventListener('click', () => {
  menu.classList.toggle('hide-menu');
});