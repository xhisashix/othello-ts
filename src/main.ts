import othello from "./othello";
import "./index.css";

// css is a string containing the contents of index.css

const game = new othello();

document.addEventListener("DOMContentLoaded", () => {
  game.initialize();
  game.render();
});

