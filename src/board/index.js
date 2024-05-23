import { useContext } from "react";
import Square from "./square";
import { Context } from "../App";

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
  const list = horizontal ? "abcdefgh".split("") : "12345678".split("");
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
  const {
    state: { complete_board },
  } = useContext(Context);
  // console.log(board);
  return (
    <div className="col-span-6">
      <div className="flex">
        <Notation horizontal={false} />
        <div className="p-2">
          {complete_board.map((pieces, index) => (
            <Rank key={index} pieces={pieces} />
          ))}
        </div>
      </div>
      <Notation horizontal={true} />
    </div>
  );
}

export default ChessBoard;
