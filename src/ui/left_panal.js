import { useContext } from "react";
import Selection from "./select";
import { Context, all_themes } from "../App";

function LeftPanel() {
  const {
    state: { theme, depth },
    dispatch,
  } = useContext(Context);
  return (
    <div className=" col-span-2 pr-3 border-r-8">
      <div className=" text-xl pb-11">
        Just sample left panel work no ready yet
      </div>
      <Selection
        title={"Theme"}
        options={all_themes}
        setValue={(val) => dispatch({ type: "setTheme", theme: val })}
        Val={theme}></Selection>
      <div className=" text-lg"> stockfish settings</div>
      <div className="flex">
        <Selection
          title={"Depth"}
          options={[15, 14, 13, 12, 11, 10]}
          setValue={(val) => dispatch({ type: "setDepth", depth: val })}
          Val={depth}></Selection>
      </div>
    </div>
  );
}

export default LeftPanel;
