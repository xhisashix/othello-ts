interface OthelloInterface {
  /**
   * Initializes the game board to its starting state.
   */
  initialize(): void;

  /**
   * Makes a move on the game board.
   * @param row The row of the move.
   * @param col The column of the move.
   * @returns void
   */
  makeMove(row: number, col: number): void;

  /**
   * Determines if the game is over.
   * @returns boolean
   */
  isGameOver(): boolean;

  /**
   * Gets the winner of the game.
   * @returns string | null
   */
  getWinner(): string | null;

  /**
   * Gets the current player.
   * @returns string
   */
  getCurrentPlayer(): string;

  /**
   * Gets the game board.
   * @returns string[][]
   */
  getBoard(): string[][];

  /**
   * Outputs the game board to the html page.
   * @returns void
   */
  render(): void;
}

export default OthelloInterface;
