const gameBoard = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
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
  return { markIndex, checkWin };
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
  let isPlayer1Turn = true;
  let round = 1;
  const boardDisplay = document.querySelector('#board');
  const squaresDisplay = boardDisplay.children;

  const playerTurn = (event) => {
    if (round >= 9) {
      alert('Game Over');
    }
    const square = event.target;
    if (isPlayer1Turn) {
      if (player1.markSquare(square.id) === 'Square marked') {
        square.textContent = player1.symbol;
        isPlayer1Turn = !isPlayer1Turn;
        round += 1;
        if(gameBoard.checkWin(player1.symbol)) {
          alert('player 1 wins!');
        }
      }      
    } else {
      if (player2.markSquare(square.id) === 'Square marked') {
        square.textContent = player2.symbol;
        isPlayer1Turn = !isPlayer1Turn;
        round += 1;
        if(gameBoard.checkWin(player2.symbol)) {
          alert('player 2 wins!');
        }
      }
    }
  };

  for(let i = 0; i < squaresDisplay.length; i++) {
    const squareDisplay = squaresDisplay[i];
    squareDisplay.addEventListener('click', playerTurn);
  }
})();

