const tf = [true, false, true, false, true, false, true, false];
const ft = [false, true, false, true, false, true, false, true];
const board_colors = [tf, ft, tf, ft, tf, ft, tf, ft];

const sq_n = "abcdefgh".split("");
// const initialFen =
//   "rnbqkbnr/pppppppp/--------/--------/--------/--------/PPPPPPPP/RNBQKBNR";
const initialFen =
  "rrrrrrrr/--------/--------/--------/--------/--------/--------/RRRRRRRR";

const notations = ["12345678".split(""), "abcdefgh".split("")];

function fen2board(fen) {
  return fen.split("/").map((line) => line.split(""));
}
function board2fen(board) {
  return board.map((line) => line.join("")).join("/");
}
function stockfish_fen(board) {
  const fen = board2fen(board);
  const sfen = fen.split("");
  const sfen2 = [];
  var empty_count = 0;
  sfen.map((x) => {
    if (x === "-") {
      empty_count += 1;
      return "";
    } else {
      var e = "";
      if (empty_count > 0) {
        e = empty_count.toString();
      }
      empty_count = 0;
      sfen2.push(e + x);
      return e + x;
    }
  });
  return sfen2.join("");
}
function complete_board(fen) {
  const board = fen2board(fen);
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var piece = board[i][j];
      board[i][j] = {
        piece: piece,
        empty: piece === "-",
        // highlight: false,
        // check: false,
        color: piece === piece.toUpperCase() ? "w" : "b",
        square: { x: i, y: j },
        noatation: `${sq_n[i]}${j + 1}`,
        light_square: i % 2 === j % 2,
        showing_legal: false,
      };
    }
  }
  return board;
}

const initialBoard = fen2board(initialFen);
console.log(complete_board(initialFen)[0][0]);
const initialState = {
  board: initialBoard,
  board_colors: board_colors,
  fen: initialFen,
  stockfish_fen: stockfish_fen(initialBoard),
  complete_board: complete_board(initialFen),
  notations: notations,
  depth: 15,
  theme: "wood",
  show_legal_moves: true,
  move: "w",
  eval: false,
  noatation: true,
  white_bottom: true,
  game_over: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setTheme":
      return {
        ...state,
        theme: action.theme,
      };
    case "setDepth":
      return {
        ...state,
        depth: action.depth,
      };
    case "ShowMover":
      return { state };

    default:
      return state;
  }
}

export { initialState, reducer };
