import { useContext } from "react";
import { AppContext } from "../App";
import { BoardContext } from "../App";

export const classes = [
  "bg-wood-light",
  "bg-wood-dark",
  "bg-dash-light",
  "bg-dash-dark",
  "bg-default-light",
  "bg-default-dark",
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
  // const path = `${
  //   process.env.PUBLIC_URL
  // }/Images/pieces/${theme.toLowerCase()}/${piece.color.toLowerCase()}${piece.piece.toUpperCase()}.png`;
  const path = `https://raw.githubusercontent.com/BibekBhusal0/Chess/main/public/Images/pieces/${theme.toLowerCase()}/${
    piece.color.toLowerCase() + piece.piece.toUpperCase()
  }.png`;
  return (
    <img
      src={path}
      className="hover:scale-105 transition-all p-1  z-20 "
      alt={`${c[piece.color]} ${piece_names[piece.piece.toLowerCase()]}`}
    />
  );
}

function LegalMove({ empty }) {
  return (
    <div className="flex group w-full h-full  opacity-30 z-30">
      {empty ? (
        <div className="w-1/4 aspect-square  opacity-75 bg-LM absolute-center rounded-full transition-all group-hover:w-1/3  group-hover:opacity-90"></div>
      ) : (
        <div className=" w-10/12 aspect-square opacity-75 border-solid border-8 border-LM absolute-center rounded-full transition-all group-hover:w-11/12  group-hover:opacity-90"></div>
      )}
    </div>
  );
}

function Highlight({ check }) {
  const c = check
    ? "bg-radial-gradient from-red-500 to-transparent from-30%"
    : "bg-yellow-400 opacity-40 ";
  return <div className={` w-full h-full absolute z-0 ${c}`}></div>;
}

function Square({ piece }) {
  const {
    state: { user },
    dispatch,
  } = useContext(BoardContext);
  const { theme } = useContext(AppContext);
  const { ShowLegalMoves, HighlightMoves } = useContext(AppContext);
  const handle_click = () => {
    if (piece.showing_legal) {
      dispatch({ type: "MakeMove", piece: piece });
    } else if (piece.empty) {
      dispatch({ type: "HideMoves" });
    } else if (piece.color === user) {
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
      {piece.clicked && <Highlight check={false} />}
      {piece.showing_legal && ShowLegalMoves && (
        <LegalMove empty={piece.empty} />
      )}
      {piece.highlight && HighlightMoves && <Highlight check={false} />}
      {piece.in_check && <Highlight check={true} />}
    </div>
  );
}

export default Square;
