import OthelloInterface from "./othelloInterface";

class othello implements OthelloInterface {
  private board: string[][];
  private currentPlayer: string;
  private winner: string | null;
  private static readonly neighborOffsets: { row: number; col: number }[] = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
  ];

  constructor() {
    this.board = [];
    this.currentPlayer = "B";
    this.winner = null;
  }

  /**
   * Initializes the game board to its starting state.
   * @returns void
   */
  initialize(): void {
    this.board = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "W", "B", "", "", ""],
      ["", "", "", "B", "W", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
  }

  /**
   * Gets the neighbor offsets.
   * @returns { row: number; col: number }[]
   */
  getNeighborOffsets(): { row: number; col: number }[] {
    return othello.neighborOffsets;
  }

  /**
   * Makes a move on the game board.
   * @param row The row of the move.
   * @param col The column of the move.
   * @returns void
   */
  makeMove(row: number, col: number): void {
    if (!this.isValidMove(row, col)) {
      return;
    }

    if (this.board[row][col] === "") {
      this.flip(row, col);
      this.currentPlayer = this.currentPlayer === "B" ? "W" : "B";
    }
  }

  /**
   * Determines if the game is over.
   * @returns boolean
   */
  isGameOver(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ""));
  }

  /**
   * Gets the winner of the game.
   * @returns string | null
   */
  getWinner(): string | null {
    let blackCount = 0;
    let whiteCount = 0;

    this.board.forEach((row) => {
      row.forEach((cell) => {
        switch (cell) {
          case "B":
            blackCount++;
            break;
          case "W":
            whiteCount++;
            break;
        }
      });
    });

    if (blackCount > whiteCount) {
      this.winner = "Black";
    } else if (whiteCount > blackCount) {
      this.winner = "White";
    } else {
      this.winner = null;
    }

    return this.winner;
  }

  /**
   * Gets the current player.
   * @returns string
   */
  getCurrentPlayer(): string {
    return this.currentPlayer;
  }

  /**
   * Gets the game board.
   * @returns string[][]
   */
  getBoard(): string[][] {
    return this.board;
  }

  /**
   * Outputs the game board to the html page.
   * @returns void
   */
  render(): void {
    this.renderBoard();
    this.renderCurrentPlayer();
    this.renderPiecesCounts();

    if (this.isGameOver()) {
      this.renderWinner();
    }
  }

  /**
   * render the game board to the html page.
   * @returns void
   */
  renderBoard(): void {
    const boardElement = document.getElementById("board");
    if (boardElement) {
      boardElement.innerHTML = "";
      this.board.forEach((row, rowIndex) => {
        const rowElement = document.createElement("div");
        rowElement.className = "row";
        row.forEach((cell, colIndex) => {
          const cellElement = document.createElement("div");
          cellElement.className = "cell";
          cellElement.className += cell === "" ? " empty" : ` ${cell}`;
          cellElement.innerText = cell;

          if (cell === "" && this.isValidMove(rowIndex, colIndex)) {
            cellElement.className += " valid-move";
            cellElement.addEventListener("click", () => {
              this.makeMove(rowIndex, colIndex);
              this.render();
            });
          }
          rowElement.appendChild(cellElement);
        });
        boardElement.appendChild(rowElement);
      });
    }
  }

  /**
   * render the current player to the html page.
   * @returns void
   */
  renderCurrentPlayer(): void {
    const currentPlayerElement = document.getElementById("current-player");
    if (currentPlayerElement) {
      if (this.currentPlayer === "B") {
        currentPlayerElement.innerText = "Black";
      } else {
        currentPlayerElement.innerText = "White";
      }
    }
  }

  /**
   * render the pieces counts to the html page.
   * @returns void
   */
  renderPiecesCounts(): void {
    const [blackCount, whiteCount] = this.countPieces();
    const blackCountElement = document.getElementById("black-count");
    const whiteCountElement = document.getElementById("white-count");

    if (blackCountElement) {
      blackCountElement.innerText = blackCount.toString();
    }

    if (whiteCountElement) {
      whiteCountElement.innerText = whiteCount.toString();
    }
  }

  /**
   * render the winner to the html page.
   * @returns void
   */
  renderWinner(): void {
    const winner = this.getWinner();
    if (winner) {
      alert(`Winner: ${winner}`);
    } else {
      alert("It's a tie!");
    }
  }

  /**
   * Flipping Othello frames
   * @param row The row of the move.
   * @param col The column of the move.
   * @returns void
   */
  flip(row: number, col: number): void {
    const currentPlayer: string = this.currentPlayer;
    const directions: { row: number; col: number }[] =
      this.getNeighborOffsets();
    directions.forEach((direction) => {
      let newRow = row + direction.row;
      let newCol = col + direction.col;
      let flipped = false;
      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (this.board[newRow][newCol] === "") {
          break;
        }
        if (this.board[newRow][newCol] === currentPlayer) {
          if (flipped) {
            while (newRow !== row || newCol !== col) {
              newRow -= direction.row;
              newCol -= direction.col;
              this.board[newRow][newCol] = currentPlayer;
            }
          }
          break;
        }
        flipped = true;
        newRow += direction.row;
        newCol += direction.col;
      }
    });

    this.board[row][col] = currentPlayer;
  }

  isValidMove(row: number, col: number): boolean {
    const currentPlayer: string = this.currentPlayer;
    const directions: { row: number; col: number }[] =
      this.getNeighborOffsets();
    for (const direction of directions) {
      let newRow = row + direction.row;
      let newCol = col + direction.col;
      let flipped = false;
      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (this.board[newRow][newCol] === "") {
          break;
        }
        if (this.board[newRow][newCol] === currentPlayer) {
          if (flipped) {
            return true;
          }
          break;
        }
        flipped = true;
        newRow += direction.row;
        newCol += direction.col;
      }
    }
    return false;
  }

  /**
   * count the number of pieces
   * @returns number, number
   */
  countPieces(): [number, number] {
    let blackCount = 0;
    let whiteCount = 0;

    this.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "B") {
          blackCount++;
        } else if (cell === "W") {
          whiteCount++;
        }
      });
    });

    return [blackCount, whiteCount];
  }
}

export default othello;
