function Gameboard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const resetBoard = () => {
    board.forEach((_, index) => (board[index] = ""));
  };

  const printBoard = () => {
    console.log(getBoard());
  };

  const createBoard = () => {
    const container = document.querySelector(".container");

    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.classList.add("row", `row-${i}`);

      for (let j = 0; j < 3; j++) {
        const square = document.createElement("div");
        square.classList.add(`square`);

        row.appendChild(square);
      }
      container.appendChild(row);
    }

    const squareDiv = document.querySelectorAll(".square");

    squareDiv.forEach((square, index) => {
      square.classList.add(`square-${index}`);
      square.setAttribute("data-index-number", `${index}`);
      square.innerHTML = board[index];
    });
  };

  const clearBoard = () => {
    const container = document.querySelector(".container");

    container.replaceChildren();
  };

  const updateBoard = () => {
    clearBoard();
    createBoard();
  };

  const placeMarker = (playerMarker, cell) => {
    if (board[cell] !== "") {
      return;
    }

    board[cell] = playerMarker;
  };

  return {
    getBoard,
    printBoard,
    placeMarker,
    createBoard,
    updateBoard,
    resetBoard,
  };
}

(function GameController() {
  const board = Gameboard();

  let playerOneName = "Player 1";
  let playerTwoName = "Player 2";
  let round = 0;

  const players = [
    { name: playerOneName, marker: "x" },
    { name: playerTwoName, marker: "o" },
  ];

  let activePlayer = players[0];
  let winner = "";

  const getActivePlayer = () => activePlayer;
  const setActivePlayer = (playerNum) => {
    activePlayer = players[playerNum];
  };

  const switchPlayerTurn = () => {
    getActivePlayer().name == playerOneName
      ? setActivePlayer(1)
      : setActivePlayer(0);
  };

  const printNewRound = () => {
    console.log(`It is ${getActivePlayer().name}'s turn!`);
  };

  const alertNewRound = () => {
    return `It is ${getActivePlayer().name}'s turn!`;
  };

  const getWinner = () => winner;
  const setWinner = (player) => {
    winner = player;
  };

  const checkWinner = (board) => {
    round++;

    const winningMoves = [
      [0, 1, 2], // Vertical
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Horizontal
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonal
      [6, 4, 2],
    ];

    for (let [a, b, c] of winningMoves) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log(`${getActivePlayer().name} is the winner!`);
        setWinner(getActivePlayer().name);
      } else if (round === 9) {
        setWinner("Tie");
        console.log("It's a tie! No one wins.");
      }
    }
  };

  const resetBtn = document.querySelector(".reset");
  const resetBoard = () => {
    round = 0;
    winner = "";
    board.resetBoard();
    board.updateBoard();
    playRound();
  };
  resetBtn.addEventListener("click", resetBoard);

  const playRound = () => {
    const squareDiv = document.querySelectorAll(".square");

    squareDiv.forEach((square) => {
      square.addEventListener("click", (e) => {
        let cell = 0;
        cell = Number(e.target.dataset.indexNumber);

        if (square.innerText !== "") {
          return;
        }
        board.placeMarker(getActivePlayer().marker, cell);
        checkWinner(board.getBoard());
        board.updateBoard();
        if (winner == "") {
          board.updateBoard();
          switchPlayerTurn();
          printNewRound();
          playRound();
        }
      });
    });
  };

  board.createBoard();
  playRound();
  printNewRound();
  board.printBoard();

  return { getActivePlayer, printNewRound, getWinner, playRound };
})();
