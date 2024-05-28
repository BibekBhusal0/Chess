import { useContext, useEffect } from "react";
import Square from "./square";
import { AppContext, BoardContext } from "../App";
import { get_best_move } from "./moves";
import { board2fen, notation2sq } from "./reducers";

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
    state: { notations, white_bottom },
  } = useContext(BoardContext);
  const list = horizontal ? notations[1] : notations[0];
  const dim = horizontal ? "w-full" : "h-full";
  const rot = white_bottom ? "" : "rotate-180";
  const direction = horizontal ? "flex-row text-center" : "flex-col pt-2";
  return (
    <div className={`flex  ${direction}`}>
      {list.map((letter) => (
        <div key={letter} className={dim}>
          <div className={rot}>{letter}</div>
        </div>
      ))}
    </div>
  );
}

function JustBoard() {
  const {
    state: { board, move_count, move, user },
    dispatch,
  } = useContext(BoardContext);

  useEffect(() => {
    const fetch_move = async () => {
      const fen = board2fen(board, move, move_count);
      const response = await get_best_move(fen);
      if (response.success) {
        const move = response.bestmove.slice(9, 14);
        const p = move.slice(0, 2);
        const sq = move.slice(2, 4);
        dispatch({
          type: "ComputerMove",
          piece: notation2sq(p),
          square: notation2sq(sq),
        });
      }
    };
    if (move !== user) {
      fetch_move();
    }
  }, [move_count, dispatch, user]);

  return (
    <div className="p-2">
      {board.map((pieces, index) => (
        <Rank key={index} pieces={pieces} />
      ))}
    </div>
  );
}

function ChessBoard() {
  const { ShowEval, ShowNotation } = useContext(AppContext);
  const {
    state: { white_bottom },
  } = useContext(BoardContext);
  return (
    <div className={`col-span-5`}>
      <div className={white_bottom ? "" : "rotate-180"}>
        <div className="flex">
          {ShowEval && <div></div>}
          {ShowNotation && <Notation horizontal={false} />}
          <JustBoard />
        </div>
        {ShowNotation && <Notation horizontal={true} />}
      </div>
    </div>
  );
}

export default ChessBoard;
