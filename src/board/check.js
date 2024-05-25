import {
  get_bishop_move,
  get_king_move,
  get_knight_move,
  get_pawn_controls,
  get_queen_move,
  get_rook_move,
} from "./moves";

function find_king(board, color) {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      const sq = board[i][j];
      if (sq.piece.toLowerCase() === "k" && color === sq.color) {
        return sq.square;
      }
    }
  }
}
function get_all_pieces(board, color) {
  const pieces = [];
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (board[i][j].color === color) {
        pieces.push([i, j]);
      }
    }
  }
  return pieces;
}
const piece_controls = {
  p: get_pawn_controls,
  r: get_rook_move,
  n: get_knight_move,
  b: get_bishop_move,
  q: get_queen_move,
  k: get_king_move,
};

function get_all_controls(board, color) {
  const controls = new Set([]);
  const pieces = get_all_pieces(board, color);
  for (var i = 0; i < pieces.length; i++) {
    const piece_x = pieces[i][0];
    const piece_y = pieces[i][1];
    const piece = board[piece_x][piece_y];
    if (piece.piece !== "-") {
      const func = piece_controls[piece.piece.toLowerCase()];
      console.log(piece.piece.toLowerCase());
      console.log(func(board, piece_x, piece_y));
    }
  }
}
export function in_check(board, color) {
  // const opp_color = color === "w" ? "b" : "w";
  // const opp_controls = get_all_controls(board, opp_color);
  return false;
}
