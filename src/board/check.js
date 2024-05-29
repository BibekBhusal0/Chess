import {
  get_bishop_move,
  get_king_move,
  get_knight_move,
  get_legal_moves,
  get_pawn_move,
  get_queen_move,
  get_rook_move,
  make_move,
} from "./moves";

export function find_king(board, color) {
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
      const sq = board[i][j];
      if (sq.color === color && !sq.empty) {
        pieces.push([i, j]);
      }
    }
  }
  return pieces;
}
const piece_controls = {
  p: get_pawn_move,
  r: get_rook_move,
  n: get_knight_move,
  b: get_bishop_move,
  q: get_queen_move,
  k: get_king_move,
};
function get_all_controls(board, color) {
  const controls = [];
  const pieces = get_all_pieces(board, color);
  for (var i = 0; i < pieces.length; i++) {
    const piece_x = pieces[i][0];
    const piece_y = pieces[i][1];
    const piece = board[piece_x][piece_y];
    if (piece.piece !== "-") {
      const func = piece_controls[piece.piece.toLowerCase()];
      controls.push(...func(board, piece_x, piece_y, true));
    }
  }
  return Array.from(new Set(controls));
}
export function in_check(board, color) {
  const opp_color = color === "w" ? "b" : "w";
  const opp_controls = get_all_controls(board, opp_color);
  const king = find_king(board, color);
  for (const square of opp_controls) {
    if (king.x === square[0] && king.y === square[1]) {
      return true;
    }
  }
  return false;
}
export function can_castle(board, color, c = false) {
  const castle = { kingside: false, queenside: false };
  const rook_side = { 0: "queenside", 7: "kingside" };
  const king_coor = find_king([...board], color);
  const king = board[king_coor.x][king_coor.y];
  if (king.not_moved && king.piece.toLowerCase() === "k") {
    for (var rook_y in rook_side) {
      rook_y = parseInt(rook_y);
      const dir = rook_y === 0 ? -1 : 1;
      const rook = board[king_coor.x][rook_y];
      if (rook.not_moved && rook.piece.toLowerCase() === "r") {
        if (c) {
          castle[rook_side[rook_y]] = true;
          continue;
        }
        if (!in_check(board, color)) {
          var i = king_coor.y;
          var not_check_count = 0;
          while (i !== rook_y) {
            if (i !== king_coor.y) {
              const p = board[king_coor.x][i];
              if (p.empty) {
                if (i !== 1) {
                  var clone = structuredClone(board);
                  clone = make_move(clone, { x: king_coor.x, y: i }, false, {
                    x: king_coor.x,
                    y: king_coor.y,
                  });
                  if (in_check(clone, color)) {
                    break;
                  } else {
                    not_check_count++;
                  }
                }
              }
            }
            i += dir;
          }
        }
        if (not_check_count === 2) {
          castle[rook_side[rook_y]] = true;
        }
      }
    }
  }

  return castle;
}
export function in_mate(board, color) {
  const pieces = get_all_pieces(board, color);
  const all_legal_moves = [];
  for (const piece of pieces) {
    const legal_moves = get_legal_moves(board, board[piece[0]][piece[1]]);
    all_legal_moves.push(...legal_moves);
  }
  return all_legal_moves.length === 0;
}
