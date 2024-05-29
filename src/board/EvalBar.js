import { useContext } from "react";
import { BoardContext } from "../App";

function EvalBar() {
  const {
    state: { white_bottom, evaluation },
  } = useContext(BoardContext);
  console.log(parseFloat(evaluation));

  return (
    <div
      id="evalbar"
      className={`h-full w-12 text-center relative border-red-600 border-2 mx-2 my-2 ${
        white_bottom ? "rotate-180" : ""
      }`}>
      <div className=" bg-white h-full w-full">{evaluation}</div>
      <div
        style={{ height: "50%" }}
        className="absolute bg-black w-full bottom-0 text-white"></div>
    </div>
  );
}

export default EvalBar;
