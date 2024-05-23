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
    <div className=" col-span-3 pr-3 border-r-8">
      <div className=" text-xl pb-11">
        Just sample left panel work no ready yet
      </div>
      <div className=" border-b-4 pb-10">
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
    </div>
  );
}

export default LeftPanel;
