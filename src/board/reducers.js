import { can_castle, find_king, in_check } from "./check";
import { hide_legal_moves, make_move, show_legal_moves } from "./moves";

const sq_n = "abcdefgh".split("");
const initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const notations = ["87654321".split(""), "abcdefgh".split("")];

export function fen2board(fen) {
  fen = fen.split(" ")[0];
  const rows = fen.split("/");
  const board = [];
  for (const row of rows) {
    var board_row = "";
    for (const sq of row) {
      if (sq.match(/[1-8]/)) {
        const emptyCount = parseInt(sq);
        board_row += "-".repeat(emptyCount);
      } else {
        board_row += sq;
      }
    }
    board.push(board_row.split(""));
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
        in_check: false,
        not_moved: true,
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
export function board2fen(board, move = "w", move_count = 0) {
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
  fen = fen.slice(0, -1);
  fen += " " + move;
  var cas = " ";
  for (const color of ["w", "b"]) {
    const castle = can_castle(board, color);
    for (const c in castle) {
      const ucase = (x) => x.toUpperCase();
      const lcase = (x) => x.toLowerCase();
      if (castle[c]) {
        const cap = color === "w" ? ucase : lcase;
        cas += cap(c[0]);
      }
    }
  }
  if (cas === " ") {
    cas += "-";
  }
  fen += cas;
  fen += " - 0 " + Math.floor(move_count / 2 + 1);
  return fen;
}

const initialState = {
  fen: initialFen,
  board: full_board(initialFen),
  all_moves: [],
  notations: notations,
  move: "w",
  move_count: 0,
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
      const move = state.move === "w" ? "b" : "w";
      const move_count = state.move_count + 1;
      const sf = board2fen(board, move, move_count);
      if (in_check(board, move)) {
        var king = find_king(board, move);
        king = state.board[king.x][king.y];
        king.in_check = true;
      }
      return {
        ...state,
        board: board,
        fen: sf,
        move: move,
        move_count: move_count,
      };
    default:
      return state;
  }
}

export { initialState, reducer };
