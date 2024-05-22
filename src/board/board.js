import { createContext, useState } from "react";
import Square from "./square";

const b = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const board_colors = [
  [true, false, true, false, true, false, true, false],
  [false, true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true, false],
  [false, true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true, false],
  [false, true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true, false],
  [false, true, false, true, false, true, false, true],
];

export const BoardContext = createContext();

function Rank({ colors, pieces }) {
  return (
    <div className=" flex justify-center">
      {colors.map((color, index) => (
        <Square key={index} piece={pieces[index]} light={color} />
      ))}
    </div>
  );
}

function ChessBoard() {
  const [board, set_board] = useState(b);
  return (
    <BoardContext.Provider value={{ board, set_board }}>
      <div className=" col-span-6">
        {board.map((pieces, index) => (
          <Rank key={index} colors={board_colors[index]} pieces={pieces} />
        ))}
      </div>
    </BoardContext.Provider>
  );
}

export default ChessBoard;
