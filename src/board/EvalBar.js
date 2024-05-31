import { useContext } from "react";
import { BoardContext } from "../App";

function EvalBar() {
  const {
    state: { white_bottom, evaluation },
  } = useContext(BoardContext);
  const rot = white_bottom ? "" : "rotate-180";
  const winChance =
    50 + 50 * (2 / (1 + Math.exp(-0.00368208 * evaluation * 10)) - 1);
  return (
    <div
      id="evalbar"
      className={`h-full w-24 text-xs text-center relative border-red-600 border-2 mx-2 my-2 ${rot}`}>
      <div className=" bg-white h-full w-full "></div>
      <div
        style={{ height: `${100 - winChance}%` }}
        className="absolute bg-black w-full top-0 transition-all"></div>
      <div
        id="evalNum"
        className={`absolute ${
          evaluation < 0 ? "top-0 text-white" : "bottom-0 text-black"
        } ${rot}`}>
        {evaluation}
      </div>
    </div>
  );
}

export default EvalBar;
