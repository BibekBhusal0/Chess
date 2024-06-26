import { can_castle, in_check } from "./check";

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
      const piece = board[i][j];
      piece.highlight = false;
      piece.in_check = false;
    }
  }
  return board;
}
export async function get_best_move(fen, depth = 15, retries = 20) {
  const api = "https://stockfish.online/api/s/v2.php";
  const req = `${api}?fen=${fen}&depth=${depth}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(req);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(`Error: success: ${data.success}`);
      }
      return data;
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.log(
          "Max retries reached. You defeated stockfish by playing the dumbest move."
        );
        return null;
      }
    }
  }
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
export function get_bishop_move(board, x, y) {
  const directions = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  return check_together(directions, board, x, y);
}
export function get_queen_move(board, x, y) {
  const rook = get_rook_move(board, x, y);
  const bishop = get_bishop_move(board, x, y);
  return bishop.concat(rook);
}
export function get_pawn_move(board, x, y, c = false) {
  const piece = board[x][y];
  const white = piece.color === "w";
  const forward = white ? -1 : 1;
  const second_rank = (white ? 6 : 1) === x;
  const fifth_rank = (white ? 3 : 4) === x;
  const legal_moves = [];
  var i = 1;

  const sides = [-1, 1];

  const controls = [];
  for (let j = 0; j < 2; j++) {
    const destination = y + sides[j];
    if (destination < 0 || destination >= 8 || x === 0 || x === 7) {
      continue;
    }
    controls.push([x + forward, destination]);
  }
  if (c) {
    return controls;
  }

  while (i < 3) {
    if (x === 0 || x === 7) {
      break;
    }
    if (!board[x + forward * i][y].empty) {
      break;
    }
    legal_moves.push([x + forward * i, y]);
    if (!second_rank) {
      break;
    }
    i++;
  }
  for (let j = 0; j < controls.length; j++) {
    const sq = board[controls[j][0]][controls[j][1]];
    const side_sqr = board[x][controls[j][1]];
    if (
      (!sq.empty && sq.color !== piece.color) ||
      (side_sqr.highlight &&
        fifth_rank &&
        side_sqr.piece.toLowerCase() === "p" &&
        !sq.highlight)
    ) {
      legal_moves.push([controls[j][0], controls[j][1]]);
    }
  }

  return legal_moves;
}
export function get_knight_move(board, x, y) {
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
export function get_king_move(board, x, y, c = false) {
  const legal_moves = [];
  const d = [-1, 1, 0];
  const piece = board[x][y];
  const color = piece.color;

  if (!c) {
    const casling_rights = can_castle(board, color);
    const king_dest = { queenside: 2, kingside: 6 };
    for (const side in casling_rights) {
      if (casling_rights[side]) {
        legal_moves.push([x, king_dest[side]]);
      }
    }
  }
  for (const i of d) {
    for (const j of d) {
      if (i === 0 && j === 0) {
        continue;
      }
      const goto_x = x + i;
      const goto_y = y + j;
      if (goto_x < 0 || goto_x >= 8 || goto_y < 0 || goto_y >= 8) {
        continue;
      }

      const goto = board[goto_x][goto_y];
      if (goto.empty) {
        legal_moves.push([goto_x, goto_y]);
      } else if (goto.color !== board[x][y].color) {
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
export function get_legal_moves(board, piece) {
  const x = piece.square.x;
  const y = piece.square.y;
  const color = piece.color;
  const func = piece_moves[piece.piece.toLowerCase()];
  const moves = func(board, x, y);
  const legal_moves = [];
  for (const c of moves) {
    var b = structuredClone(board);
    b = make_move(b, { x: c[0], y: c[1] }, false, piece.square);
    if (!in_check(b, color)) {
      legal_moves.push(c);
    }
  }

  return legal_moves;
}
export function show_legal_moves(board, piece) {
  const legal_moves = get_legal_moves(board, piece);
  for (const c of legal_moves) {
    board[c[0]][c[1]].showing_legal = true;
  }
  board[piece.square.x][piece.square.y].clicked = true;
  return board;
}
export function make_move(
  board,
  square,
  serious = true,
  piece_coor = null,
  notation_array = []
) {
  if (piece_coor === null) {
    piece_coor = search_piece(board);
  }
  const piece = board[piece_coor.x][piece_coor.y];
  const sq = board[square.x][square.y];
  var notation;
  if (sq.empty) {
    if (piece.piece.toUpperCase() === "P") {
      notation = sq.notation;
    } else {
      notation = piece.piece.toUpperCase() + sq.notation;
    }
  } else {
    if (piece.piece.toUpperCase() === "P") {
      notation = piece.notation[0] + "x" + sq.notation;
    } else {
      notation = piece.piece.toUpperCase() + "x" + sq.notation;
    }
  }
  if (piece.piece.toLowerCase() === "p") {
    const white = piece.color === "w";
    const fifth_rank = white ? 3 : 4;
    if (piece_coor.x === fifth_rank) {
      const eps = board[fifth_rank][square.y];
      if (eps.piece.toLowerCase() === "p" && square.y !== piece_coor.y) {
        notation = piece.notation[0] + "x" + sq.notation;
        eps.empty = true;
        eps.piece = "-";
      }
    }
  }
  if (serious) {
    if (
      piece.piece.toLowerCase() === "k" &&
      piece.not_moved &&
      !piece.in_check
    ) {
      const y_coor = square.y;
      if (y_coor === 2 || y_coor === 6) {
        const init_y = y_coor === 6 ? 7 : 0;
        const final_y = y_coor === 6 ? 5 : 3;
        notation = y_coor === 6 ? "O-O" : "O-O-O";
        make_move(
          board,
          {
            ...square,
            y: final_y,
          },
          false,
          {
            ...square,
            y: init_y,
          }
        );
      }
    }
    notation_array.push(notation);
    board = clear_highlight(board);

    sq.highlight = true;
    piece.highlight = true;
    board = hide_legal_moves(board);
  }

  sq.piece = piece.piece;
  sq.empty = false;
  sq.color = piece.color;
  piece.piece = "-";
  piece.empty = true;
  sq.not_moved = false;
  piece.not_moved = false;
  return board;
}
