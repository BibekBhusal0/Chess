import { BoardContext } from "../App";
import { useContext, useEffect, useRef, useState } from "react";
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
      className="flex justify-center align-middle font-bold my-2 p-2 border-2 rounded-md col-span-2 border-blue-600 text-blue-700 transition-all hover:border-transparent hover:text-white hover:bg-blue-600"
      onClick={clickHandelr}>
      <div className={`text-2xl transition-all ease-out duration-700 ${t}`}>
        {icon}
      </div>
      <div>{text}</div>
    </button>
  );
}

function PlayedMoves({ PGN }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });
  return (
    <div
      ref={ref}
      className="flex flex-wrap content-start justify-start h-52 overflow-auto">
      {PGN.map((item, index) => (
        <div className="basis-1/2 " key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}

function RightPanel() {
  const {
    state: { move, user, game_over, game_over_by, winner, PGN },
    dispatch,
  } = useContext(BoardContext);
  const padding = " lg:px-3 sm:px-20 px-3 ";
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
    <div className="lg:col-span-3 lg:border-l-8 border-t-8 relative border-t-gray-600 lg:border-t-0 col-span-5 text-center">
      <div
        id="Basic settings and information"
        className={`border-b-4 py-4 ${padding}`}>
        <div className="lg:text-2xl text-lg pb-10">
          <div className=" font-bold">{t1}</div>
          {t2}
        </div>
        <div>
          <div id="buttons">
            <button
              onClick={() => dispatch({ type: "ChangeColor" })}
              className={`font-bold text-center lg:text-2xl text-lg w-full cursor-pointer p-3 border-2  transition-all ease-out rounded-md  ${button_styles}`}>
              Play as {opp_color}
            </button>
          </div>
          <div className=" grid ">
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
      </div>
      <div id="notations" className={`text-center text-2xl w-full ${padding}`}>
        <div>MOVES:</div>
        <PlayedMoves PGN={PGN} />
      </div>
    </div>
  );
}

export default RightPanel;
