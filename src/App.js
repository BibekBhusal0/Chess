import { createContext, useState, useReducer } from "react";
import ChessBoard from "./board";
import LeftPanel from "./ui/left_panal";
import RightPanel from "./ui/right_panel";
import { initialState, reducer } from "./board/reducers";
import Footer from "./ui/footer";

export const all_themes = [
  "Default",
  "Cosmos",
  "Dash",
  "Glass",
  "Nature",
  "Ocen",
  "Wood",
  "Marble",
  "Geometric",
  "Light",
];
export const AppContext = createContext();
export const BoardContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [depth, setDepth] = useState(15);
  const [theme, setTheme] = useState("default");
  const [ShowEval, setShowEval] = useState(true);
  const [ShowNotation, setShowNotation] = useState(true);
  const [ShowLegalMoves, setShowLegalMoves] = useState(true);
  const [HighlightMoves, setHighlightMoves] = useState(true);

  return (
    <>
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
        <div className="grid lg:grid-cols-10 grid-cols-5">
          <LeftPanel />
          <BoardContext.Provider value={{ state, dispatch }}>
            <ChessBoard />
            <RightPanel />
          </BoardContext.Provider>
        </div>
      </AppContext.Provider>
      <Footer />
    </>
  );
}

export default App;
