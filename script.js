const gameBoard = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];
  const markIndex = (index, symbol) => {
    if (boardArray[index] === '') {
      boardArray[index] = symbol;
      return 'Square marked';
    } else {
      return 'This square is already marked';
    }    
  };
  const checkWin = (symbol) => {
    if (boardArray[0] === symbol && boardArray[1] === symbol && boardArray[2] === symbol ||
        boardArray[0] === symbol && boardArray[4] === symbol && boardArray[8] === symbol ||
        boardArray[0] === symbol && boardArray[3] === symbol && boardArray[6] === symbol ||
        boardArray[3] === symbol && boardArray[4] === symbol && boardArray[5] === symbol ||
        boardArray[6] === symbol && boardArray[7] === symbol && boardArray[8] === symbol ||
        boardArray[1] === symbol && boardArray[4] === symbol && boardArray[7] === symbol ||
        boardArray[2] === symbol && boardArray[5] === symbol && boardArray[8] === symbol ||
        boardArray[2] === symbol && boardArray[4] === symbol && boardArray[6] === symbol) {
      return true;
    } else {
      return false;
    }
  };
  const emptyBoard = () => boardArray = ['', '', '', '', '', '', '', '', ''];
  return { markIndex, checkWin, emptyBoard };
})();

const player = (symbol) => {
  const markSquare = (square) => {
    return gameBoard.markIndex(square, symbol)
  }
  return { markSquare, symbol };
}

const displayController = (() => {
  const player1 = player('X');
  const player2 = player('O');
  let player1Name = 'Player 1';
  let player2Name = 'Player 2';
  let isPlayer1Turn = true;
  let round = 1;
  const boardDisplay = document.querySelector('#board');
  const squaresDisplay = boardDisplay.children;
  const boardContainer = document.querySelector('#board-container');
  const startButton = document.querySelector('#start-button');
  const introContainer = document.querySelector('.intro-container');
  const playerNameInput1 = document.querySelector('#player1-name');
  const playerNameInput2 = document.querySelector('#player2-name');
  const submitNamesButton = document.querySelector('#submit-names-button');
  const namesForm = document.querySelector('#names-form');
  const infoLabel = document.querySelector('#info-label');
  const restartButton = document.querySelector('#restart-button');

  startButton.addEventListener('click', () => {
    introContainer.classList.add('hidden');
    namesForm.style.display = 'flex';
  });

  submitNamesButton.addEventListener('click', () => {
    if (playerNameInput1.value !== '') {
      player1Name = playerNameInput1.value;
      infoLabel.textContent = `${player1Name}'s turn`;
    }
    if (playerNameInput2.value !== '') {
      player2Name = playerNameInput2.value;
    }
    namesForm.style.display = 'none';
    boardContainer.style.display = 'flex';
  });

  infoLabel.textContent = `${player1Name}'s turn`;

  restartButton.addEventListener('click', () => {
    gameBoard.emptyBoard();
    for (let i = 0; i < squaresDisplay.length; i++) {
      const squareDisplay = squaresDisplay[i];
      squareDisplay.textContent = '';
      squareDisplay.addEventListener('click', playerTurn);
    }
    isPlayer1Turn = true;
    round = 1;
    infoLabel.textContent = `${player1Name}'s turn`;
    infoLabel.className = '';
    infoLabel.classList.add('blue-turn');
    restartButton.style.display = 'none';
  })

  const endGame = () => {
    for (let i = 0; i < squaresDisplay.length; i++) {
      const squareDisplay = squaresDisplay[i];
      squareDisplay.removeEventListener('click', playerTurn, false);
    }
  }


  const playerTurn = (event) => {
    const square = event.target;
    if (round >= 9) {
      infoLabel.textContent = 'Tie game';
      infoLabel.classList.remove('blue-turn');
      infoLabel.classList.add('tie-game');
      player1.markSquare(square.id);
      square.textContent = player1.symbol;
      square.classList.add('player-x');
      restartButton.style.display = 'inline';
    } else {
      if (isPlayer1Turn) {
        if (player1.markSquare(square.id) === 'Square marked') {
          square.classList.add('player-x');
          square.textContent = player1.symbol;
          isPlayer1Turn = !isPlayer1Turn;
          round += 1;
          infoLabel.textContent = `${player2Name}'s turn`;
          if(gameBoard.checkWin(player1.symbol)) {
            infoLabel.textContent = `${player1Name} wins!`;
            infoLabel.classList.remove('blue-turn');
            infoLabel.classList.add('win-game');
            restartButton.style.display = 'inline';
            endGame();
          } else {
            infoLabel.classList.remove('blue-turn');
            infoLabel.classList.add('red-turn');
          }
        }      
      } else {
        if (player2.markSquare(square.id) === 'Square marked') {
          square.classList.add('player-o');
          square.textContent = player2.symbol;
          isPlayer1Turn = !isPlayer1Turn;
          round += 1;
          infoLabel.textContent = `${player1Name}'s turn`;
          if(gameBoard.checkWin(player2.symbol)) {
            infoLabel.textContent = `${player2Name} wins!`
            infoLabel.classList.remove('red-turn');
            infoLabel.classList.add('win-game');
            restartButton.style.display = 'inline';
            endGame();
          } else {
            infoLabel.classList.remove('red-turn');
            infoLabel.classList.add('blue-turn');
          }
        }
      }
    }
  };

  for (let i = 0; i < squaresDisplay.length; i++) {
    const squareDisplay = squaresDisplay[i];
    squareDisplay.addEventListener('click', playerTurn);
  }
})();

