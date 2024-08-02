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

      const validMoves = this.getValidMoves();
      if (validMoves.length === 0) {
        this.currentPlayer = this.currentPlayer === "B" ? "W" : "B";
        const nextValidMoves = this.getValidMoves();
        if (nextValidMoves.length === 0) {
          const blackCount = this.board.flat().filter((cell) => cell === "B")
            .length;
          const whiteCount = this.board.flat().filter((cell) => cell === "W")
            .length;
          this.winner =
            blackCount > whiteCount ? "Black" : blackCount < whiteCount ? "White" : "Tie";
        }
      }
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
          cellElement.addEventListener("click", () => {
            this.makeMove(rowIndex, colIndex);
            this.render();
          });
          rowElement.appendChild(cellElement);
        });
        boardElement.appendChild(rowElement);
      });
    }

    const currentPlayerElement = document.getElementById("current-player");
    if (currentPlayerElement) {
      currentPlayerElement.innerText = this.currentPlayer;
    }
  }

  /**
   * Flipping Othello frames
   * @param row The row of the move.
   * @param col The column of the move.
   * @returns void
   */
  flip(row: number, col: number): void {
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    const currentPlayer = this.currentPlayer;
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

  /**
   * Obtains an array of positions where the player can place stones.
   * @returns { row: number, col: number }[]
   */
  getValidMoves(): { row: number; col: number }[] {
    const validMoves = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.board[row][col] === "") {
          const validMove = this.isValidMove(row, col);
          if (validMove) {
            validMoves.push({ row, col });
          }
        }
      }
    }

    console.log(validMoves);
    return validMoves;
  }

  isValidMove(row: number, col: number): boolean {
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    const currentPlayer = this.currentPlayer;
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
}

export default othello;
