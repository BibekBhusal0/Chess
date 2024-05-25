import { in_check } from "./check";
import { board2fen, full_board } from "./reducers";

function check(board, x, y, dx, dy, c = false) {
  var i = x + dx;
  var j = y + dy;
  var legal_moves = [];
  while (i >= 0 && i < 8 && j >= 0 && j < 8) {
    const sq = board[i][j];
    if (sq.piece === "-") {
      legal_moves.push([i, j]);
      i += dx;
      j += dy;
    } else if (sq.color === board[x][y].color) {
      if (c) {
        legal_moves.push([i, j]);
      }
      break;
    } else {
      legal_moves.push([i, j]);
      break;
    }
  }
  return legal_moves;
}
function check_together(directions, board, x, y, c = false) {
  var legal_moves = [];
  for (var i = 0; i < directions.length; i++) {
    var moves = check(board, x, y, directions[i][0], directions[i][1], (c = c));
    legal_moves = legal_moves.concat(moves);
  }
  return legal_moves;
}
function search_piece(board) {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (board[i][j].clicked) {
        return { x: i, y: j };
      }
    }
  }
}
const piece_moves = {
  r: get_rook_move,
  n: get_knight_move,
  b: get_bishop_move,
  q: get_queen_move,
  k: get_king_move,
  p: get_pawn_move,
};
function clear_highlight(board) {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      board[i][j].highlight = false;
    }
  }
  return board;
}
// export function get_pawn_controls(board, x, y) {

// }
export function get_rook_move(board, x, y, c = false) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return check_together(directions, board, x, y, (c = c));
}
export function get_bishop_move(board, x, y, c = false) {
  const directions = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  return check_together(directions, board, x, y, (c = c));
}
export function get_queen_move(board, x, y, c = false) {
  const rook = get_rook_move(board, x, y, (c = c));
  const bishop = get_bishop_move(board, x, y, (c = c));
  return bishop.concat(rook);
}
export function get_pawn_move(board, x, y, c = false) {
  const piece = board[x][y];
  const white = piece.color === "w";
  const forward = white ? -1 : 1;
  const second_rank = (white ? 6 : 1) === x;
  const legal_moves = [];
  var i = 1;
  while (i < 3) {
    if (x === 0 || x === 7) {
      break;
    }
    if (!board[x + forward][y].empty) {
      break;
    }
    legal_moves.push([x + forward * i, y]);
    if (!second_rank) {
      break;
    }
    i++;
  }

  const sides = [-1, 1];

  const controls = [];
  for (var j = 0; j < 2; j++) {
    const destination = y + sides[j];
    if (destination < 0 || destination >= 8 || x === 0 || x === 7) {
      continue;
    }
    controls.push([x + forward, destination]);
  }
  if (c) {
    return controls;
  }

  for (var j = 0; j < controls.length; j++) {
    const sq = board[controls[j][0]][controls[j][1]];
    if (!sq.empty && sq.color !== piece.color) {
      legal_moves.push([controls[j][0], controls[j][1]]);
    }
  }

  return legal_moves;
}
export function get_knight_move(board, x, y, c = false) {
  const m = [1, 2, -1, -2];
  const moves = [];
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m.length; j++) {
      const a = m[i];
      const b = m[j];
      if (Math.abs(a) !== Math.abs(b)) {
        const goto_x = a + x;
        const goto_y = b + y;
        if (goto_x >= 0 && goto_y >= 0 && goto_x < 8 && goto_y < 8) {
          if (board[goto_x][goto_y].empty) {
            moves.push([goto_x, goto_y]);
          } else if (board[goto_x][goto_y].color !== board[x][y].color) {
            moves.push([goto_x, goto_y]);
          } else if (board[goto_x][goto_y].color === board[x][y].color && c) {
            moves.push([goto_x, goto_y]);
          }
        }
      }
    }
  }
  return moves;
}
export function get_king_move(board, x, y, c = false) {
  const legal_moves = [];
  const d = [-1, 1, 0];
  for (const i of d) {
    for (const j of d) {
      if (i === 0 && j === 0) {
        continue;
      }
      if (x + i < 0 || x + i >= 8 || y + j < 0 || y + j >= 8) {
        continue;
      }
      const goto_x = x + i;
      const goto_y = y + j;

      const goto = board[goto_x][goto_y];
      if (goto.empty) {
        legal_moves.push([goto_x, goto_y]);
      } else if (goto.color !== board[x][y].color) {
        legal_moves.push([goto_x, goto_y]);
      } else if (goto.color === board[x][y].color && c) {
        legal_moves.push([goto_x, goto_y]);
      }
    }
  }

  return legal_moves;
}
export function hide_legal_moves(board) {
  for (var rank = 0; rank < 8; rank++) {
    for (var file = 0; file < 8; file++) {
      board[rank][file].showing_legal = false;
      board[rank][file].clicked = false;
    }
  }
  return board;
}

export function show_legal_moves(board, piece) {
  const x = piece.square.x;
  const y = piece.square.y;
  const color = piece.color;
  const func = piece_moves[piece.piece.toLowerCase()];
  const moves = func(board, x, y);
  for (var i = 0; i < moves.length; i++) {
    const c = moves[i];
    var b = full_board(board2fen(board));
    b = just_make_move(b, piece.square, { x: c[0], y: c[1] });
    if (!in_check(b, color)) {
      board[c[0]][c[1]].showing_legal = true;
    }
  }
  board[piece.square.x][piece.square.y].clicked = true;
  return board;
}

function just_make_move(board, piece_coor, square_coor) {
  const sq = board[square_coor.x][square_coor.y];
  const piece = board[piece_coor.x][piece_coor.y];
  sq.piece = piece.piece;
  piece.piece = "-";
  return board;
}

export function make_move(board, square) {
  const piece_coor = search_piece(board);
  if (piece_coor) {
    board = clear_highlight(board);
    const piece = board[piece_coor.x][piece_coor.y];
    const sq = board[square.x][square.y];
    sq.piece = piece.piece;
    sq.empty = false;
    sq.color = piece.color;
    sq.highlight = true;
    piece.highlight = true;
    piece.piece = "-";
    piece.empty = true;
    board = hide_legal_moves(board);
  }
  return board;
}
