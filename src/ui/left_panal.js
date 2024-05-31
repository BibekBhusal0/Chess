import { useContext, useState } from "react";
import Selection from "./select";
import { AppContext, all_themes } from "../App";
import ToggleSwitch from "./toggle_switch";
import { IoCloseSharp, IoMenu } from "react-icons/io5";

function SideBar({ show }) {
  const padding = "lg:px-3 px-3 sm:px-10";

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
    <div className={`${show ? "block" : "hidden"}  lg:block`}>
      <div id="GeneralSettings" className="border-b-4 py-4">
        <div className={padding}>
          <div className="text-2xl font-bold">General Settings</div>
          <div>
            <Selection
              title={"Theme"}
              options={all_themes}
              setValue={setTheme}
              Val={theme}></Selection>
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
          </div>
        </div>
      </div>
      <div id="StockfishSettings" className=" border-b-4 py-5">
        <div className={padding}>
          <div className=" text-2xl font-bold pb-4">
            Stockfish Settings
            <div className=" text-sm">
              Note: These Settings Does Not work it's
              <span className=" font-semibold"> Under Construction </span>
            </div>
          </div>
          <Selection
            title={"Depth"}
            options={[15, 14, 13, 12, 11, 10]}
            setValue={(d) => setDepth(parseInt(d))}
            Val={depth}></Selection>
          <ToggleSwitch
            bool={ShowEval}
            changeBool={setShowEval}
            title="Evaluation Bar"
          />
        </div>
      </div>
    </div>
  );
}

function LeftPanel() {
  const [show, setShow] = useState(false);
  return (
    <div className="col-span-5 lg:col-span-2 lg:border-r-8 ">
      <div className="flex flex-row-reverse">
        <button
          className="lg:hidden text-4xl p-2 mb-0 mr-3 border-2 m-1"
          onClick={() => setShow(!show)}
          id="icon">
          {show ? <IoCloseSharp /> : <IoMenu />}
        </button>
      </div>
      <SideBar show={show} />
    </div>
  );
}

export default LeftPanel;
