import OthelloInterface from "./othelloInterface";

class othello implements OthelloInterface {
  private board: string[][];
  private currentPlayer: string;
  private winner: string | null;

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

  private static readonly neighborOffsets = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
  ];

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
        if (cell === "B") {
          blackCount++;
        } else if (cell === "W") {
          whiteCount++;
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

    if (this.isGameOver()) {
      const winner = this.getWinner();
      if (winner) {
        alert(`Winner: ${winner}`);
      } else {
        alert("It's a tie!");
      }
    }

    const currentPlayerElement = document.getElementById("current-player");
    if (currentPlayerElement) {
      if (this.currentPlayer === "B") {
        currentPlayerElement.innerText = "Black";
      } else {
        currentPlayerElement.innerText = "White";
      }
    }

    const [blackCount, whiteCount] = this.countPieces();

    const blackCountElement = document.getElementById("black-count");
    if (blackCountElement) {
      blackCountElement.innerText = blackCount.toString();
    }

    const whiteCountElement = document.getElementById("white-count");

    if (whiteCountElement) {
      whiteCountElement.innerText = whiteCount.toString();
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
      let r = row + direction.row;
      let c = col + direction.col;
      let flipped = false;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (this.board[r][c] === "") {
          break;
        }
        if (this.board[r][c] === currentPlayer) {
          if (flipped) {
            while (r !== row || c !== col) {
              r -= direction.row;
              c -= direction.col;
              this.board[r][c] = currentPlayer;
            }
          }
          break;
        }
        flipped = true;
        r += direction.row;
        c += direction.col;
      }
    });

    this.board[row][col] = currentPlayer;
  }

  isValidMove(row: number, col: number): boolean {
    const currentPlayer: string = this.currentPlayer;
    const directions: { row: number; col: number }[] =
      this.getNeighborOffsets();
    for (const direction of directions) {
      let r = row + direction.row;
      let c = col + direction.col;
      let flipped = false;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (this.board[r][c] === "") {
          break;
        }
        if (this.board[r][c] === currentPlayer) {
          if (flipped) {
            return true;
          }
          break;
        }
        flipped = true;
        r += direction.row;
        c += direction.col;
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
