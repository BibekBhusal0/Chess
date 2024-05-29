import { can_castle, find_king, in_check, in_mate } from "./check";
import { hide_legal_moves, make_move, show_legal_moves } from "./moves";

const sq_n = "abcdefgh".split("");
const initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const notations = ["87654321".split(""), "abcdefgh".split("")];

export function notation2sq(notation) {
  var file = notation[0].toLowerCase();
  file = sq_n.indexOf(file);
  const rank = 8 - parseInt(notation[1]);
  return [rank, file];
}
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
export function board2fen(board, move = "w", move_count = 1) {
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
    const castle = can_castle(board, color, true);
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
  fen += ` - 0 ${move_count}`;
  return fen;
}
export function check_over(board, move_color) {
  var check = in_check(board, move_color);
  var mate = in_mate(board, move_color);
  var game_over = false;
  var game_over_by = null;
  var winner = null;

  if (check) {
    var king = find_king(board, move_color);
    king = board[king.x][king.y];
    king.in_check = true;
  }
  if (mate) {
    game_over = true;
    if (check) {
      winner = move_color === "w" ? "b" : "w";
      game_over_by = "Checkmate";
    } else {
      game_over_by = "Stalemate";
    }
  }
  return [game_over, game_over_by, winner];
}
export const initialBoard = () => full_board(initialFen);

const initS = {
  board: initialBoard(),
  all_moves: [],
  notations: notations,
  move: "w",
  move_count: 0,
  user: "w",
  white_bottom: true,
  game_over: false,
  game_over_by: null,
  winner: null,
};
export const initialState = structuredClone(initS);

export function reducer(state, action) {
  switch (action.type) {
    case "ShowMoves":
      var piece = action.piece;
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
      const move_count = state.move_count + 1;
      var move = state.move === "w" ? "b" : "w";
      var [game_over, game_over_by, winner] = check_over(board, move);

      return {
        ...state,
        board: board,
        move: move,
        move_count: move_count,
        game_over: game_over,
        game_over_by: game_over_by,
        winner: winner,
      };
    case "ComputerMove":
      piece = action.piece;
      var square = action.square;
      piece = { x: piece[0], y: piece[1] };
      square = { x: square[0], y: square[1] };
      board = make_move([...state.board], square, true, piece);
      move = state.move === "w" ? "b" : "w";
      [game_over, game_over_by, winner] = check_over(board, move);
      return {
        ...state,
        board: board,
        game_over: game_over,
        game_over_by: game_over_by,
        winner: winner,
        move: move,
      };
    case "ChangeColor":
      const user = state.user === "w" ? "b" : "w";
      var white_bottom = user === "w" ? true : false;
      return {
        ...structuredClone(initS),
        user: user,
        white_bottom: white_bottom,
      };
    case "ResetBoard":
      return {
        ...structuredClone(initS),
        user: state.user,
        white_bottom: state.white_bottom,
      };
    case "FlipBoard":
      white_bottom = !state.white_bottom;
      return { ...state, white_bottom: white_bottom };

    default:
      return state;
  }
}
