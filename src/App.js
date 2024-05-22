import { createContext, useState } from "react";
import ChessBoard from "./board/board";
import LeftPanel from "./ui/left_panal";
import RightPanel from "./ui/right_panel";

// const api = "https://stockfish.online/api/s/v2.php";
// var fen = "rn1q1rk1/pp2b1pp/2p2n2/3p1pB1/3P4/1QP2N2/PP1N1PPP/R4RK1 b - - 1 11";
// var depth = 15;
// var sample_request =
//   "https://stockfish.online/api/s/v2.php?fen=rn1q1rk1/pp2b1pp/2p2n2/3p1pB1/3P4/1QP2N2/PP1N1PPP/R4RK1%20b%20-%20-%201%2011&depth=15";
// var sample_request = `${api}?fen=${fen}&depth=${depth}`;

export const ThemeContext = createContext("wood");

function App() {
  const [theme, setTheme] = useState("wood");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* header if i keep it */}
      <div className="grid grid-cols-12 p-3 gap-3">
        <LeftPanel />
        <ChessBoard />
        <RightPanel />
      </div>
      {/* footer */}
    </ThemeContext.Provider>
  );
}

export default App;
