import { BoardContext } from "../App";
import { useContext } from "react";

function RightPanel() {
  const {
    state: { move },
  } = useContext(BoardContext);
  return (
    <div className=" col-span-2 border-l-4 p-2 pl-0">
      <div className="text-xl pb-11 pl-3">Right side panel will be here</div>
      <div className=" border-b-4 pb-40 pl-3">Pice notations will be here</div>
      <div className=" text-lg font-bold  pl-3">
        {move === "w" ? "White" : "Black"} to move
      </div>
      <div className=" border-t-4 mt-4 pl-3">
        Credits to API: <br />
        <a href="https://chess-api.com/">chess-api.com</a>
        <br />
        <br />
        Credits to pieces: <br />
        <a href="https://github.com"> Lichess github</a>
      </div>
    </div>
  );
}

export default RightPanel;
