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
  const splited_fens = fen.split(" ");
  const casling_rights = splited_fens[2].split("");
  const enpassant_target = splited_fens[3];
  const target = {
    K: [7, 0],
    Q: [7, 7],
    k: [0, 0],
    q: [0, 7],
  };
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

  for (const a in target) {
    if (!casling_rights.includes(a)) {
      full_board[target[a][0]][target[a][1]].not_moved = false;
    }
  }
  if (enpassant_target !== "-") {
    const [rank, file] = notation2sq(enpassant_target);
    full_board[rank + 1][file].highlight = true;
    full_board[rank - 1][file].highlight = true;
  }
  return full_board;
}
export function board2fen(board, move = "w", move_count = 1) {
  var fen = "";
  const highlighted = [];
  for (const rank of board) {
    var emptyCount = 0;
    for (const sq of rank) {
      if (sq.highlight) {
        highlighted.push(sq.square);
      }
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

  const seventh_rank = move === "w" ? 1 : 6;
  const sixth_rank = move === "w" ? 2 : 5;
  const fifth_rank = move === "w" ? 3 : 4;

  const ranks =
    move === "w" ? [seventh_rank, fifth_rank] : [fifth_rank, seventh_rank];

  var match = 0;
  var pawn = 0;

  if (highlighted.length === 2) {
    if (highlighted[0].y === highlighted[1].y) {
      for (let i = 0; i < ranks.length; i++) {
        if (highlighted[i].x === ranks[i]) {
          if (
            board[highlighted[i].x][highlighted[i].y].piece.toLowerCase() ===
            "p"
          ) {
            pawn++;
          }
          match++;
        }
      }
    }
  }
  var ep_target = "-";

  if (match === 2 && pawn === 1) {
    ep_target = board[sixth_rank][highlighted[0].y].notation;
  }
  fen += " ";
  fen += ep_target;
  fen += ` 0 ${move_count}`;
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
  evaluation: 0.0,
  mate_chance: null,
  promotion: false,
  promotion_sq: null,
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
        return { ...state, board };
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
      var promotion = false;
      var promotion_sq = null;
      if (action.piece.piece.toLowerCase() === "p") {
        const eightRank = action.piece.color === "w" ? 0 : 7;
        if (action.piece.square.x === eightRank) {
          promotion = true;
          promotion_sq = action.piece.square;
        }
      }
      return {
        ...state,
        board,
        move,
        move_count,
        game_over,
        game_over_by,
        winner,
        promotion,
        promotion_sq,
      };
    case "ComputerMove":
      piece = action.piece;
      var square = action.square;
      piece = { x: piece[0], y: piece[1] };
      square = { x: square[0], y: square[1] };
      board = make_move([...state.board], square, true, piece);
      move = state.move === "w" ? "b" : "w";
      [game_over, game_over_by, winner] = check_over(board, move);
      if (action.promotion !== " ") {
        board[square.x][square.y].piece = action.promotion;
      }
      return {
        ...state,
        evaluation: action.evaluation,
        mate_chance: action.mate_chance,
        board,
        game_over,
        game_over_by,
        winner,
        move,
      };
    case "ChangeColor":
      const user = state.user === "w" ? "b" : "w";
      var white_bottom = user === "w" ? true : false;
      return {
        ...structuredClone(initS),
        user,
        white_bottom,
      };
    case "ResetBoard":
      return {
        ...structuredClone(initS),
        user: state.user,
        white_bottom: state.white_bottom,
      };
    case "FlipBoard":
      white_bottom = !state.white_bottom;
      return { ...state, white_bottom };
    case "Promote":
      board = [...state.board];
      board[state.promotion_sq.x][state.promotion_sq.y].piece = action.piece;
      promotion = false;
      promotion_sq = null;
      return { ...state, board, promotion, promotion_sq };

    default:
      return state;
  }
}
