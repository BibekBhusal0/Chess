import { BoardContext } from "../App";
import { useContext, useState } from "react";
import { PiDeviceRotateFill } from "react-icons/pi";
import { BiReset } from "react-icons/bi";

function ButtonWithIcon({ icon, text, onClick }) {
  const [zero, setZero] = useState(true);
  const clickHandelr = () => {
    setZero(!zero);
    onClick();
  };
  const t = zero ? "rotate-0" : "rotate-[360deg]";

  return (
    <button
      className="flex gap-2 justify-center align-middle m-2 p-2 border-2 col-span-2 border-blue-600 text-blue-700 rounded-md font-bold transition-all hover:border-transparent hover:text-white hover:bg-blue-600"
      onClick={clickHandelr}>
      <div className={`text-2xl transition-all ease-out duration-700 ${t}`}>
        {icon}
      </div>
      <div>{text}</div>
    </button>
  );
}

function RightPanel() {
  const {
    state: { move, user, game_over, game_over_by, winner },
    dispatch,
  } = useContext(BoardContext);
  const padding = "pl-3";
  const color = user === "w" ? "White" : "Black";
  const opp_color = user === "w" ? "Black" : "White";
  const t1 = game_over
    ? `Game over by ${game_over_by}`
    : `${move === "w" ? "White" : "Black"} to move`;
  const t2 = game_over
    ? ` ${
        winner === null
          ? "It's a Draw"
          : `${winner === "w" ? "White" : "Black"} is victorious`
      }`
    : `You are Playing as ${color}`;

  const button_styles =
    user === "w"
      ? "bg-pink-50 text-gray-700 border-gray-700 hover:text-white hover:bg-gray-800 hover:border-transparent"
      : "text-white bg-gray-800 border-transparent hover:text-gray-900 hover:bg-white hover:border-gray-900 ";
  return (
    <div className=" col-span-2 border-l-4 p-2 pl-0 ">
      <div className={`border-b-4 pb-4 mb-4 ${padding}`}>
        <div className="text-2xl font-bold">{t1}</div>
        <div className="text-xl">{t2}</div>
        <button
          onClick={() => dispatch({ type: "ChangeColor" })}
          className={`font-bold text-center w-full cursor-pointer py-1 text-xl transition-all ease-out pink mt-2 rounded-md border-2 ${button_styles}`}>
          Play as {opp_color}
        </button>
        <div className=" grid grid-cols-2">
          <ButtonWithIcon
            icon={<PiDeviceRotateFill />}
            text="Flip Board"
            onClick={() => dispatch({ type: "FlipBoard" })}
          />
          <ButtonWithIcon
            icon={<BiReset />}
            text={"New Game"}
            onClick={() => dispatch({ type: "ResetBoard" })}
          />
        </div>
      </div>
      <div className={`border-b-4 ${padding}`}>
        <div className="pb-40">Pice notations will be here</div>
      </div>

      <div className={`mt-4 ${padding}`}>
        <div>Plan to move this section to footer</div>
        Credits to API: <br />
        <a href="https://stockfish.online/"> Stockfish </a>
        <br />
        <br />
        Credits to pieces: <br />
        <a href="https://github.com/lichess-org/lila"> Lichess github</a>
      </div>
    </div>
  );
}

export default RightPanel;
