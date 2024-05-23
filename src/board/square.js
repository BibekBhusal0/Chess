import { useContext } from "react";
import { AppContext } from "../App";
import { BoardContext } from "../App";

export const classes = [
  "bg-wood-light",
  "bg-wood-dark",
  "bg-dash-light",
  "bg-dash-dark",
  "bg-defult-light",
  "bg-defult-dark",
  "bg-crazy-light",
  "bg-crazy-dark",
  "bg-cosmos-light",
  "bg-cosmos-dark",
  "bg-icy-sea-light",
  "bg-icy-sea-dark",
  "bg-ocen-light",
  "bg-ocen-dark",
  "bg-nature-light",
  "bg-nature-dark",
  "bg-glass-light",
  "bg-glass-dark",
];

export const piece_names = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

const c = {
  w: "white",
  b: "black",
};

function get_color(light, theme) {
  return `bg-${theme}-${light ? "light" : "dark"}`.toLowerCase();
}

function PieceImg({ piece }) {
  const { theme } = useContext(AppContext);
  const path = `${process.env.PUBLIC_URL}/Images/pieces/${theme}/${
    piece.color
  }${piece.piece.toLowerCase()}.png`;
  return (
    <img
      src={path}
      className="hover:scale-105 transition-all"
      alt={`${c[piece.color]} ${piece_names[piece.piece.toLowerCase()]}`}
    />
  );
}

function LegalMove() {
  return (
    <div className="flex">
      <div className="w-1/4 aspect-square opacity-65 bg-red-600 absolute top-2/4 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full transition-all hover:w-3/4 hover:rounded-2xl hover:opacity-80"></div>
    </div>
  );
}

function Square({ piece }) {
  const { dispatch } = useContext(BoardContext);
  const { theme } = useContext(AppContext);
  const { ShowLegalMoves } = useContext(AppContext);
  const handle_click = () => {
    if (piece.showing_legal) {
      dispatch({ type: "MakeMove", piece: piece });
    } else if (piece.empty) {
      dispatch({ type: "HideMoves" });
    } else {
      dispatch({ type: "ShowMoves", piece: piece });
    }
  };
  return (
    <div
      onClick={() => handle_click()}
      className={`aspect-square relative w-full grid  ${get_color(
        piece.light_square,
        theme
      )}  `}>
      {!piece.empty && <PieceImg piece={piece} />}
      {piece.showing_legal && ShowLegalMoves && <LegalMove />}
    </div>
  );
}

export default Square;
