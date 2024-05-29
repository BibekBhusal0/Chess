import { useContext } from "react";
import Selection from "./select";
import { AppContext, all_themes } from "../App";
import ToggleSwitch from "./toggle_switch";

function LeftPanel() {
  const {
    ShowEval,
    setShowEval,
    ShowNotation,
    setShowNotation,
    theme,
    setTheme,
    depth,
    setDepth,
    ShowLegalMoves,
    setShowLegalMoves,
    HighlightMoves,
    setHighlightMoves,
  } = useContext(AppContext);
  return (
    <div className=" col-span-3 border-r-8">
      <div className="text-xl pb-6 border-b-8 border-blue-500">
        Just left panel (not complete yet) all functions may not be working
      </div>
      <div className=" border-b-4 pb-10 pr-3">
        <ToggleSwitch
          bool={ShowNotation}
          changeBool={setShowNotation}
          title="Show Notation"
        />
        <ToggleSwitch
          bool={ShowLegalMoves}
          changeBool={setShowLegalMoves}
          title="Show Legal Moves"
        />
        <ToggleSwitch
          bool={HighlightMoves}
          changeBool={setHighlightMoves}
          title="Highlight Moves"
        />
        <Selection
          title={"Theme"}
          options={all_themes}
          setValue={setTheme}
          Val={theme}></Selection>
      </div>
      <div className=" text-lg"> stockfish settings</div>
      <Selection
        title={"Depth"}
        options={[15, 14, 13, 12, 11, 10]}
        setValue={setDepth}
        Val={depth}></Selection>
      <ToggleSwitch
        bool={ShowEval}
        changeBool={setShowEval}
        title="Evaluation Bar"
      />
      <div className="text-xl pb-11 border-t-4">
        Functions yet to add
        <ol className="list-decimal pl-4 pt-2">
          <li className=" text-lg">Piece promotions</li>
          <li className=" text-lg"> Stock fish be able to take enpassant</li>
          <li className=" text-lg">Eval Bar and other stockfish settings </li>
          <li className=" text-lg">
            improve square color and chess pieces (themes)
          </li>
          <li className=" text-lg">
            Useless Draw rules like 3 fold repetition, insufficient checkmate
            material, 50 move rule
          </li>
          <li className=" text-lg">Chess Notations </li>
          <li className=" text-lg">
            Make website responsive for different screens
          </li>
        </ol>
      </div>
    </div>
  );
}

export default LeftPanel;
