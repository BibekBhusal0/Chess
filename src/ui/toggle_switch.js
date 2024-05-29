function ToggleSwitch({ bool, changeBool, title = "Toggle Switch" }) {
  const clickHandler = () => changeBool(!bool);
  return (
    <div className=" grid grid-cols-3 py-2 align-middle border-t-2 border-blue-200 border-dotted">
      <div className=" text-xl col-span-2 ">{title}</div>
      <div
        onClick={clickHandler}
        className={` w-12 h-4 p-3 text-center cursor-pointer transition-all rounded-full grid items-center drop-shadow-lg col-span-1 relative ${
          bool ? "bg-green-500" : "bg-red-500"
        }`}>
        <div
          className={`aspect-square h-full rounded-full border-black border-4 absolute transition-all bg-white ${
            !bool ? "left-0" : "left-full -translate-x-3/4"
          }`}></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
