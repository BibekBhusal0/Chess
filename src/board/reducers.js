import { hide_legal_moves, make_move, show_legal_moves } from "./moves";

const sq_n = "abcdefgh".split("");
const initialFen =
  "rnbqkbnr/pppppppp/--------/--------/--------/--------/PPPPPPPP/RNBQKBNR";
// const initialFen =
//   "rrrrbbPb/PPP---PP/---q----/--------/--------/--------/---Qp---/RRpRBBBB";

const notations = ["87654321".split(""), "abcdefgh".split("")];

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
        highlight: false,
        check: false,
        color: piece === piece.toUpperCase() ? "w" : "b",
        square: { x: i, y: j },
        notation: `${sq_n[j]}${8 - i}`,
        light_square: i % 2 === j % 2,
        showing_legal: false,
        clicked: false,
      };
    }
  }
  return board;
}
function cb2stockfish_fen(board) {
  const fen = [];
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      fen.push(board[i][j].piece);
    }
    if (i !== 7) {
      fen.push("/");
    }
  }
  return stockfish_fen(fen2board(fen.join("")));
}

const initialBoard = fen2board(initialFen);
cb2stockfish_fen(complete_board(initialFen));
const initialState = {
  stockfish_fen: stockfish_fen(initialBoard),
  board: complete_board(initialFen),
  notations: notations,
  move: "w",
  white_bottom: true,
  game_over: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ShowMoves":
      const piece = action.piece;
      var board = [...state.board];
      if (!state.game_over && piece.color === state.move) {
        hide_legal_moves(board);
        board = show_legal_moves(board, piece);
        return { ...state, board: board };
      }
      return state;
    case "HideMoves":
      board = hide_legal_moves([...state.board]);
      return { ...state, board: board };
    case "MakeMove":
      board = make_move([...state.board], action.piece.square);
      const sf = cb2stockfish_fen(board);
      const move = state.move === "w" ? "b" : "w";
      return { ...state, board: board, stockfish_fen: sf, move: move };
    default:
      return state;
  }
}

export { initialState, reducer };
