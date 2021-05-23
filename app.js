const gameBoard = (() => {
  const displayPlayerTurn = document.querySelector('.player-turn');

  const fadeImg = (e) => {
    const img = e.currentTarget.firstChild;
    window.getComputedStyle(img).opacity; //eslint-disable-line
    img.style.opacity = 1;
  };

  const displaySymbol = (e, player) => {
    e.currentTarget.style.cursor = 'default';
    const insertSymbol = (symbol) => `<img src="img/${symbol}.svg" alt="${symbol}"></img>`;
    e.currentTarget.innerHTML = insertSymbol(player);
    fadeImg(e);
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

  const squares = document.querySelectorAll('.square');

  const ticTacToeBoard = document.querySelector('.tic-tac-toe-board');

  const toggleBoardPointerEvents = () => {
    ticTacToeBoard.classList.toggle('disable-click');
  };

  const player1Btn = document.querySelector('.player1-btn');

  const player2Btn = document.querySelector('.player2-btn');

  return {
    displayPlayerTurn,
    displaySymbol,
    toggleMenu,
    toggleResult,
    squares,
    toggleBoardPointerEvents,
    player1Btn,
    player2Btn,
  };
})();

const gameLogic = (() => { //eslint-disable-line
  let currentPlayer;
  let xPlayerMoves = [];
  let oPlayerMoves = [];
  let win;
  let players;
  let xIsFirst = true;

  const switchPlayer = () => {
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    gameBoard.displayPlayerTurn.textContent = `Player '${currentPlayer}' Turn`;
  };

  const logMove = (index) => {
    if (currentPlayer === 'X') {
      xPlayerMoves.push(index);
    } else {
      oPlayerMoves.push(index);
    }
  };

  const playerMove = (e, index) => {
    gameBoard.displaySymbol(e, currentPlayer);
    logMove(index);
  };

  const checkWinningPossibility = (arr, target) => target.every((v) => arr.includes(v));

  const winningPossibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8],
  ];

  const testEndGame = () => {
    winningPossibilities.some((array) => { //eslint-disable-line
      if (checkWinningPossibility(xPlayerMoves, array)) {
        win = true;
        gameBoard.toggleResult("'X' WINS");
        setTimeout(() => { gameBoard.toggleMenu(); }, 100);
        return true;
      } if (checkWinningPossibility(oPlayerMoves, array)) {
        win = true;
        gameBoard.toggleResult("'O' WINS");
        setTimeout(() => { gameBoard.toggleMenu(); }, 100);
        return true;
      }
    });
    if (xPlayerMoves.concat(oPlayerMoves).length === 9 && !win) {
      gameBoard.toggleResult('DRAW');
      setTimeout(() => { gameBoard.toggleMenu(); }, 100);
    }
  };

  const gameAI = (() => {
    const scores = {
      X: -1,
      O: 1,
      tie: 0,
    };

    const testPossibleEndGame = () => {
      let possibleEndResult = null;
      winningPossibilities.some((array) => { //eslint-disable-line
        if (checkWinningPossibility(xPlayerMoves, array)) {
          possibleEndResult = 'X';
          return true;
        } if (checkWinningPossibility(oPlayerMoves, array)) {
          possibleEndResult = 'O';
          return true;
        }
      });
      if (xPlayerMoves.concat(oPlayerMoves).length === 9 && possibleEndResult === null) {
        possibleEndResult = 'tie';
      }
      return possibleEndResult;
    };

    const possibleMoves = (player1, player2) => [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((val) => !player1.concat(player2).includes(val)); //eslint-disable-line

    const minimax = (player1, player2, depth, isMaximizing) => { //eslint-disable-line
      const result = testPossibleEndGame();
      if (result !== null) {
        return scores[result];
      }
      if (isMaximizing) {
        let bestScore = -Infinity;
        possibleMoves(xPlayerMoves, oPlayerMoves).forEach((move) => {
          oPlayerMoves.push(move);
          const score = minimax(xPlayerMoves, oPlayerMoves, depth + 1, false);
          oPlayerMoves.pop();
          bestScore = Math.max(score, bestScore);
        });
        return bestScore;
      } if (!isMaximizing) {
        let bestScore = Infinity;
        possibleMoves(xPlayerMoves, oPlayerMoves).forEach((move) => {
          xPlayerMoves.push(move);
          const score = minimax(xPlayerMoves, oPlayerMoves, depth + 1, true);
          xPlayerMoves.pop();
          bestScore = Math.min(score, bestScore);
        });
        return bestScore;
      }
    };

    const computerMove = () => {
      let bestScore = -Infinity;
      let bestMove;
      possibleMoves(xPlayerMoves, oPlayerMoves).forEach((move) => {
        oPlayerMoves.push(move);
        const score = minimax(xPlayerMoves, oPlayerMoves, 0, false);
        oPlayerMoves.pop();
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      });
      return bestMove;
    };

    return { computerMove };
  })();

  const setBoard = (square, index) => {
    square.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      if (!xPlayerMoves.concat(oPlayerMoves).includes(index)) {
        playerMove(e, index);
        testEndGame();
        switchPlayer();
      }
      if (currentPlayer === 'O' && players === 1 && xPlayerMoves.concat(oPlayerMoves).length !== 9 && win === false) {
        gameBoard.toggleBoardPointerEvents();
        setTimeout(() => { gameBoard.squares[gameAI.computerMove()].click(); }, 800);
        setTimeout(() => { gameBoard.toggleBoardPointerEvents(); }, 1000);
      }
    }, { once: true });
  };

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
    gameBoard.displayPlayerTurn.textContent = `Player '${currentPlayer}' Turn`;
    gameBoard.squares.forEach((square, index) => {
      square.style.cursor = 'pointer';
      square.innerHTML = '';
      setBoard(square, index);
    });
  };

  gameBoard.player1Btn.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    gameBoard.toggleMenu();
    initialize(1);
    if (currentPlayer === 'O') {
      gameBoard.toggleBoardPointerEvents();
      setTimeout(() => { gameBoard.squares[4].click(); }, 800);
      setTimeout(() => { gameBoard.toggleBoardPointerEvents(); }, 1000);
    }
  });

  gameBoard.player2Btn.addEventListener('click', () => {
    gameBoard.toggleMenu();
    initialize(2);
  });
})();
