import { useContext } from "react";
import { Context } from "../App";

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
  const {
    state: { theme },
    dispatch,
  } = useContext(Context);
  const path = `${process.env.PUBLIC_URL}/Images/pieces/${theme}/${
    piece.color
  }${piece.piece.toLowerCase()}.png`;
  return (
    <img
      onAbort={dispatch({ type: "ShowMoves", piece: piece })}
      onClick={dispatch({ type: "ShowMoves", piece: piece })}
      src={path}
      className="hover:scale-105 transition-all"
      alt={`${c[piece.color]} ${piece_names[piece.piece.toLowerCase()]}`}
    />
  );
}

function LegalMove() {
  return (
    <div className="flex">
      <div className=" w-1/4 aspect-square opacity-65 bg-red-600 absolute top-2/4 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full hover:w-3/4 hover:rounded-2xl hover:opacity-80 transition-all "></div>
    </div>
  );
}

function Square({ piece }) {
  const {
    state: { theme, show_legal_moves },
  } = useContext(Context);
  return (
    <div
      className={`aspect-square relative w-full grid ${get_color(
        piece.light_square,
        theme
      )}  `}>
      {!piece.empty && <PieceImg piece={piece}></PieceImg>}
      {piece.showing_legal && show_legal_moves && <LegalMove></LegalMove>}
    </div>
  );
}

export default Square;
