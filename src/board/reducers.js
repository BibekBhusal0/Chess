import { hide_legal_moves, make_move, show_legal_moves } from "./moves";

const sq_n = "abcdefgh".split("");
const initialFen = "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR";
const notations = ["87654321".split(""), "abcdefgh".split("")];

function fen2board(fen) {
  const rows = fen.split("/");
  const board = [];
  for (const sq of rows) {
    var board_row = [];
    for (const piece of sq) {
      if (piece.match(/[1-8]/)) {
        const emptyCount = parseInt(piece);
        board_row = "-".repeat(emptyCount).split("");
      } else {
        board_row.push(piece);
      }
    }
    board.push(board_row);
  }
  return board;
}

export function full_board(fen) {
  const simple_board = fen2board(fen);
  const full_board = simple_board.map((rank, i) =>
    rank.map((piece, j) => {
      return {
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
    })
  );
  return full_board;
}
export function board2fen(board) {
  var fen = "";
  for (const rank of board) {
    var emptyCount = 0;
    for (const sq of rank) {
      if (sq.piece === "-") {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += sq.piece;
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    fen += "/";
  }
  return fen.slice(0, -1);
}

const initialState = {
  fen: initialFen,
  board: full_board(initialFen),
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
      const sf = board2fen(board);
      const move = state.move === "w" ? "b" : "w";
      return { ...state, board: board, fen: sf, move: move };
    default:
      return state;
  }
}

export { initialState, reducer };
