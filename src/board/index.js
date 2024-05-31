import { useContext, useEffect } from "react";
import Square from "./square";
import { AppContext, BoardContext } from "../App";
import { board2fen, notation2sq } from "./reducers";
import { get_best_move } from "./moves";
import EvalBar from "./EvalBar";
import Promotion from "./promotion";

function Rank({ pieces }) {
  return (
    <div className="justify-center grid grid-cols-8">
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
    state: { board, move_count, move, user, game_over, promotion },
    dispatch,
  } = useContext(BoardContext);

  const { depth } = useContext(AppContext);
  useEffect(() => {
    if (move !== user && !game_over) {
      const fetch_move = async () => {
        const fen = board2fen(board, move, move_count);
        const response = await get_best_move(fen, depth);
        const sf_move = response.bestmove.slice(9, 14);
        const p = sf_move.slice(0, 2);
        const sq = sf_move.slice(2, 4);
        const prom = sf_move[4];
        dispatch({
          type: "ComputerMove",
          piece: notation2sq(p),
          square: notation2sq(sq),
          promotion: prom,
          evaluation: response.evaluation,
          mate_chance: response.mate,
        });
      };
      fetch_move();
    }
  }, [move_count, dispatch, user, board, depth, game_over, move]);

  return (
    <div>
      <div className="p-2 relative">
        {promotion && <Promotion />}
        {board.map((pieces, index) => (
          <Rank key={index} pieces={pieces} />
        ))}
      </div>
    </div>
  );
}

function ChessBoard() {
  const { ShowEval, ShowNotation } = useContext(AppContext);
  const {
    state: { white_bottom },
  } = useContext(BoardContext);

  return (
    <div className="col-span-5 p-1 flex">
      {ShowEval && <EvalBar />}
      <div className={white_bottom ? "" : "rotate-180"}>
        <div className="flex realtive">
          {ShowNotation && <Notation horizontal={false} />}
          <JustBoard />
        </div>
        {ShowNotation && <Notation horizontal={true} />}
      </div>
    </div>
  );
}

export default ChessBoard;
