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
      this.board[row][col] = this.currentPlayer;
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
  }
}

export default othello;
