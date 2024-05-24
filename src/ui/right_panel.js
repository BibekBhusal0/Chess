import { BoardContext } from "../App";
import { useContext } from "react";

function RightPanel() {
  const {
    state: { move },
  } = useContext(BoardContext);
  return (
    <div className=" col-span-2 border-l-4 p-2">
      <div className="text-xl pb-11">Right side panel will be here</div>
      <div className=" border-b-4 pb-40">Pice notations will be here</div>
      <div className=" text-lg">{move === "w" ? "White" : "Black"} to move</div>
    </div>
  );
}

export default RightPanel;
