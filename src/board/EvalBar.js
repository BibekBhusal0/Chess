import { useContext } from "react";
import { BoardContext } from "../App";

function EvalBar() {
  const {
    state: { white_bottom, evaluation },
  } = useContext(BoardContext);
  var eval_max = Math.floor(Math.abs(evaluation) / 10) * 10;
  const rot = white_bottom ? "" : "rotate-180";
  eval_max += 10;
  var eval_percent = 50;
  if (evaluation !== 0) {
    var eval_frac = evaluation / eval_max;
    eval_frac += 1;
    eval_percent = eval_frac * 50;
  }
  eval_percent = 100 - eval_percent;
  return (
    <div
      id="evalbar"
      className={`h-full w-24 text-xs text-center relative border-red-600 border-2 mx-2 my-2 ${rot}`}>
      <div className=" bg-white h-full w-full "></div>
      <div
        style={{ height: `${eval_percent}%` }}
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
