import { createContext, useReducer } from "react";
import ChessBoard from "./board";
import LeftPanel from "./ui/left_panal";
import RightPanel from "./ui/right_panel";
import { initialState, reducer } from "./reducers";

// const api = "https://stockfish.online/api/s/v2.php";
// var fen = "rn1q1rk1/pp2b1pp/2p2n2/3p1pB1/3P4/1QP2N2/PP1N1PPP/R4RK1 b - - 1 11";
// var depth = 15;
// var sample_request =
//   "https://stockfish.online/api/s/v2.php?fen=rn1q1rk1/pp2b1pp/2p2n2/3p1pB1/3P4/1QP2N2/PP1N1PPP/R4RK1%20b%20-%20-%201%2011&depth=15";
// var sample_request = `${api}?fen=${fen}&depth=${depth}`;

export const all_themes = [
  "Wood",
  "Cosmos",
  "Dash",
  "Defult",
  "Glass",
  "Nature",
  "Ocen",
];
export const Context = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {/* header if i keep it */}
      <div className="grid grid-cols-10 p-3 gap-3">
        <LeftPanel />
        <ChessBoard />
        <RightPanel />
      </div>
      {/* footer */}
    </Context.Provider>
  );
}

export default App;
