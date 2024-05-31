import { useContext } from "react";
import { BoardContext } from "../App";

function EvalBar() {
  const {
    state: { white_bottom, evaluation, mate_chance },
  } = useContext(BoardContext);
  var e = evaluation;
  var white_winning = e <= 0;
  var winChance;
  const rot = white_bottom ? "" : "rotate-180";
  if (e === null && mate_chance !== null) {
    e = `M-${Math.abs(mate_chance)}`;
    white_winning = mate_chance <= 0;
    winChance = white_winning ? 100 : -100;
  } else {
    winChance = 50 - 50 * (2 / (1 + Math.exp(-0.00368208 * e * 10)) - 1);
  }
  return (
    <div
      id="evalbar"
      className={`h-full w-24 relative border-red-600 border-2 mx-2 my-2 ${rot}`}>
      <div className=" bg-white h-full w-full "></div>
      <div
        style={{ height: `${winChance}%` }}
        className="absolute bg-black w-full top-0 transition-all"></div>
      <div
        id="evalNum"
        className={`absolute w-full text-center font-bold text-xs ${
          white_winning ? "top-0 text-white" : "bottom-0 text-black"
        } ${rot}`}>
        {e}
      </div>
    </div>
  );
}

export default EvalBar;
