import { useContext } from "react";
import Square from "./square";
import { AppContext, BoardContext } from "../App";

function Rank({ pieces }) {
  return (
    <div className=" flex justify-center">
      {pieces.map((piece, index) => (
        <Square key={index} piece={piece} />
      ))}
    </div>
  );
}

function Notation({ horizontal }) {
  const {
    state: { notations },
  } = useContext(BoardContext);
  const list = horizontal ? notations[1] : notations[0];
  const c = horizontal ? "w-full" : "h-full";
  const direction = horizontal ? "flex-row text-center" : "flex-col pt-2";
  return (
    <div className={`flex  ${direction}`}>
      {list.map((letter) => (
        <div key={letter} className={c}>
          {letter}
        </div>
      ))}
    </div>
  );
}

function ChessBoard() {
  const { ShowEval, ShowNotation } = useContext(AppContext);
  const {
    state: { board },
  } = useContext(BoardContext);
  return (
    <div className="col-span-8">
      <div className="flex">
        {ShowEval && <div></div>}
        {ShowNotation && <Notation horizontal={false} />}
        <div className="p-2">
          {board.map((pieces, index) => (
            <Rank key={index} pieces={pieces} />
          ))}
        </div>
      </div>
      {ShowNotation && <Notation horizontal={true} />}
    </div>
  );
}

export default ChessBoard;
