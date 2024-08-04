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
