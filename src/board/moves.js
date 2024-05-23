function check(board, x, y, dx, dy) {
  var i = x + dx;
  var j = y + dy;
  var legal_moves = [];
  while (i >= 0 && i < 8 && j >= 0 && j < 8) {
    if (board[i][j].piece === "-") {
      legal_moves.push([i, j]);
      i += dx;
      j += dy;
    } else if (board[i][j].piece === board[x][y].piece) {
      break;
    } else {
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

export function hide_legal_moves(board) {
  for (var rank = 0; rank < 8; rank++) {
    for (var file = 0; file < 8; file++) {
      board[rank][file].showing_legal = false;
    }
  }
  return board;
}

export function get_rook_move(board, x, y) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return check_together(directions, board, x, y);
}

export function get_boshop_move(board, x, y) {}
