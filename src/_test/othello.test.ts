import othello from "../othello";

describe("initialize", () => {
  it("should initialize the game board to its starting state", () => {
    const game = new othello();
    game.initialize();

    const expectedBoard = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "W", "B", "", "", ""],
      ["", "", "", "B", "W", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(game.getBoard()).toEqual(expectedBoard);
  });
});

describe("getNeighborOffsets", () => {
  it("should return the correct neighbor offsets", () => {
    const game = new othello();
    const expectedOffsets = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    expect(game.getNeighborOffsets()).toEqual(expectedOffsets);
  });

  it("should return an array with 8 elements", () => {
    const game = new othello();
    const offsets = game.getNeighborOffsets();

    expect(offsets.length).toBe(8);
  });

  it("should return objects with row and col properties", () => {
    const game = new othello();
    const offsets = game.getNeighborOffsets();

    offsets.forEach((offset) => {
      expect(offset).toHaveProperty("row");
      expect(offset).toHaveProperty("col");
    });
  });
});

describe("makeMove", () => {
  it("should make a move and update the board correctly", () => {
    const game = new othello();
    game.initialize();
    game.makeMove(2, 3); // Assuming this is a valid move for Black

    const expectedBoard = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "B", "", "", "", ""],
      ["", "", "", "B", "B", "", "", ""],
      ["", "", "", "B", "W", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(game.getBoard()).toEqual(expectedBoard);
    expect(game.getCurrentPlayer()).toBe("W");
  });

  it("should ignore an invalid move", () => {
    const game = new othello();
    game.initialize();
    game.makeMove(0, 0); // Invalid move

    const expectedBoard = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "W", "B", "", "", ""],
      ["", "", "", "B", "W", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(game.getBoard()).toEqual(expectedBoard);
    expect(game.getCurrentPlayer()).toBe("B");
  });

  it("should flip the correct pieces", () => {
    const game = new othello();
    game.initialize();
    game.makeMove(2, 3); // Assuming this is a valid move for Black

    const expectedBoard = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "B", "", "", "", ""],
      ["", "", "", "B", "B", "", "", ""],
      ["", "", "", "B", "W", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(game.getBoard()).toEqual(expectedBoard);
  });
});

describe("isGameOver", () => {
  it("should return false for a new game", () => {
    const game = new othello();
    game.initialize();
    expect(game.isGameOver()).toBe(false);
  });

  it("should return true when the board is full", () => {
    const game = new othello();
    game.initialize();
    game.getBoard().forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        game.getBoard()[rowIndex][colIndex] = rowIndex % 2 === 0 ? "B" : "W";
      });
    });
    expect(game.isGameOver()).toBe(true);
  });

  it("should return false when the board is partially filled", () => {
    const game = new othello();
    game.initialize();
    game.getBoard()[0][0] = "B";
    game.getBoard()[0][1] = "W";
    expect(game.isGameOver()).toBe(false);
  });
});

describe("getWinner", () => {
  it("should return 'Black' when Black has more pieces", () => {
    const game = new othello();
    game.initialize();
    game.makeMove(2, 3); // Assuming this is a valid move for Black
    game.makeMove(2, 4); // Assuming this is a valid move for White
    game.makeMove(2, 5); // Assuming this is a valid move for Black

    expect(game.getWinner()).toBe("Black");
  });

  it("should return 'White' when White has more pieces", () => {
    const game = new othello();
    game.initialize();
    game.makeMove(2, 3); // Assuming this is a valid move for Black
    game.makeMove(2, 4); // Assuming this is a valid move for White
    game.makeMove(3, 5); // Assuming this is a valid move for Black
    game.makeMove(4, 2); // Assuming this is a valid move for White

    expect(game.getWinner()).toBe("White");
  });

  it("should return null when there is a tie", () => {
    const game = new othello();
    game.initialize();
    // Manually set the board to a tie state
    game.getBoard()[3][3] = "B";
    game.getBoard()[3][4] = "W";
    game.getBoard()[4][3] = "W";
    game.getBoard()[4][4] = "B";

    expect(game.getWinner()).toBeNull();
  });
});
