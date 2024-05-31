import { useContext } from "react";
import { AppContext, BoardContext } from "../App";
import { im_path } from "./square";

function PromotionPiece({ color, piece }) {
  const { theme } = useContext(AppContext);
  const { dispatch } = useContext(BoardContext);
  const path =
    im_path +
    "/pieces/" +
    theme.toLowerCase() +
    "/" +
    color.toLowerCase() +
    piece.toUpperCase() +
    ".png";
  return (
    <img
      src={path}
      onClick={() => dispatch({ type: "Promote", piece })}
      alt={piece}
      className="cursor-pointer p-4 w-3/12 hover:scale-110 transition-all"
    />
  );
}

function Promotion() {
  const {
    state: { user, white_bottom },
  } = useContext(BoardContext);
  const cl = white_bottom ? "" : "rotate-180";
  return (
    <>
      <div
        className={`absolute top-0 w-full h-full bg-green-200 z-50 opacity-80 hover:cursor-not-allowed justify-center text-center align-middle text-xl ${cl}`}>
        <div className="opacity-100 text-2xl font-bold py-3">
          Choose Piece to Promote
        </div>
        <div className="flex">
          {["b", "r", "n", "q"].map((p) => (
            <PromotionPiece color={user} piece={p} key={p} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Promotion;
