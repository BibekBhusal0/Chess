import { useContext } from "react";
import { ThemeContext } from "../App";

export const classes = ["bg-wood-light", "bg-wood-dark"];

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
  return `bg-${theme}-${light ? "light" : "dark"}`;
}

function get_piece(piece, theme) {
  const color = piece === piece.toUpperCase() ? "w" : "b";

  if (piece !== " ") {
    // const path = `$/Images/pices/wood/${color}${piece.toLowerCase()}.png`;
    // console.log(path);
    return (
      <div className="">
        <img
          src={`${
            process.env.PUBLIC_URL
          }/Images/pieces/${theme}/${color}${piece.toLowerCase()}.png`}
          alt={`${c[color]} ${piece_names[piece.toLowerCase()]}`}
        />
      </div>
    );
  }
}

function Square({ piece, light }) {
  const { theme } = useContext(ThemeContext);
  //   console.log(get_piece(piece));
  return (
    <div className={` aspect-square w-full ${get_color(light, theme)} `}>
      {get_piece(piece, theme)}
    </div>
  );
}

export default Square;
