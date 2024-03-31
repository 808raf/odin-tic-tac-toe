function Gameboard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const printBoard = () => {
    console.log(getBoard());
  };

  const placeMarker = (playerMarker, cell) => {
    if (board[cell] !== "") {
      return;
    }

    board[cell] = playerMarker;
  };

  return { getBoard, printBoard, placeMarker };
}

(function GameController() {
  const board = Gameboard();

  let playerOneName = "Player 1";
  let playerTwoName = "Player 2";

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
    console.log(`It is ${activePlayer.name}'s turn!`);
  };

  const alertNewRound = () => {
    return `It is ${activePlayer.name}'s turn!`;
  };

  const getWinner = () => winner;
  const setWinner = (player) => {
    winner = player;
  };

  const checkWinner = (board) => {
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
        console.log(`${activePlayer.name} is the winner!`);
        setWinner(activePlayer.name);
      }
    }
  };

  const playRound = () => {
    const cell = prompt(alertNewRound());
    board.placeMarker(activePlayer.marker, cell);
    board.printBoard();

    checkWinner(board.getBoard());

    if (winner === "") {
      switchPlayerTurn();
      playRound();
      console.log(getActivePlayer());
    }
  };

  printNewRound();
  board.printBoard();
  playRound();

  return { getActivePlayer, printNewRound, getWinner };
})();
