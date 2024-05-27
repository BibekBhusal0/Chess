import { createContext, useState, useReducer } from "react";
import ChessBoard from "./board";
import LeftPanel from "./ui/left_panal";
import RightPanel from "./ui/right_panel";
import { initialState, reducer } from "./board/reducers";

export const all_themes = [
  "Ocen",
  "Wood",
  "Cosmos",
  "Dash",
  "default",
  "Glass",
  "Nature",
];
export const AppContext = createContext();
export const BoardContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [depth, setDepth] = useState(15);
  const [theme, setTheme] = useState("ocen");
  const [ShowEval, setShowEval] = useState(false);
  const [ShowNotation, setShowNotation] = useState(true);
  const [ShowLegalMoves, setShowLegalMoves] = useState(true);
  const [HighlightMoves, setHighlightMoves] = useState(true);

  return (
    <AppContext.Provider
      value={{
        ShowEval,
        setShowEval,
        ShowNotation,
        setShowNotation,
        depth,
        setDepth,
        ShowLegalMoves,
        setShowLegalMoves,
        HighlightMoves,
        setHighlightMoves,
        theme,
        setTheme,
      }}>
      {/* header if i keep it */}
      <div className="grid grid-cols-10 p-3 gap-3">
        <LeftPanel />
        <BoardContext.Provider value={{ state, dispatch }}>
          <ChessBoard />
          <RightPanel />
        </BoardContext.Provider>
      </div>
      {/* footer */}
    </AppContext.Provider>
  );
}

export default App;
