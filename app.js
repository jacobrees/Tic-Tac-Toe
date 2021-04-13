const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');
const menu = document.querySelector('.menu');

function toggleMenu() {
  menu.classList.toggle('hide-menu');
}

player1Btn.addEventListener('click', () => {
  toggleMenu();
});

player2Btn.addEventListener('click', () => {
  toggleMenu();
});