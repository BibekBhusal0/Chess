function check(board, x, y, dx, dy) {
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
      break;
    } else {
      legal_moves.push([i, j]);
      break;
    }
  }
  return legal_moves;
}
function check_together(directions, board, x, y) {
  var legal_moves = [];
  for (var i = 0; i < directions.length; i++) {
    var moves = check(board, x, y, directions[i][0], directions[i][1]);
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
      // console.log("board[i][j]");
    }
  }
  return board;
}

function get_rook_move(board, x, y) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return check_together(directions, board, x, y);
}
function get_bishop_move(board, x, y) {
  const directions = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  return check_together(directions, board, x, y);
}
function get_queen_move(board, x, y) {
  const rook = get_rook_move(board, x, y);
  const bishop = get_bishop_move(board, x, y);
  return bishop.concat(rook);
}
function get_pawn_move(board, x, y) {}
function get_knight_move(board, x, y) {
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
          }
        }
      }
    }
  }
  return moves;
}
function get_king_move(board, x, y) {}

export function hide_legal_moves(board) {
  for (var rank = 0; rank < 8; rank++) {
    for (var file = 0; file < 8; file++) {
      board[rank][file].showing_legal = false;
      board[rank][file].clicked = false;
    }
  }
  return board;
}

export function get_legal_moves(board, piece) {
  const x = piece.square.x;
  const y = piece.square.y;
  const func = piece_moves[piece.piece.toLowerCase()];
  const moves = func(board, x, y);
  return moves;
}

export function show_legal_moves(board, piece) {
  const moves = get_legal_moves(board, piece);
  for (var i = 0; i < moves.length; i++) {
    var c = moves[i];
    board[c[0]][c[1]].showing_legal = true;
  }
  board[piece.square.x][piece.square.y].clicked = true;
  return board;
}

export function make_move(board, square) {
  const piece_corr = search_piece(board);
  if (piece_corr) {
    board = clear_highlight(board);
    const piece = board[piece_corr.x][piece_corr.y];
    const sq = board[square.x][square.y];
    sq.piece = piece.piece;
    sq.empty = false;
    sq.color = piece.color;
    piece.piece = "-";
    piece.empty = true;
    board = hide_legal_moves(board);
  }
  return board;
}
