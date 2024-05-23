function ToggleSwitch({ bool, changeBool, title = "Toggle Switch" }) {
  const clickHandler = () => changeBool(!bool);
  return (
    <div className=" grid grid-cols-3 align-middle py-3">
      <div className=" text-xl col-span-2 ">{title}</div>
      <div
        onClick={clickHandler}
        className={` w-12 h-4 p-3 m-3 text-center cursor-pointer transition-all rounded-full grid items-center col-span-1 relative ${
          bool ? "bg-green-500" : "bg-red-500"
        }`}>
        <div
          className={` aspect-square h-full rounded-full border-black  border-4 absolute transition-all bg-white ${
            !bool ? "left-0" : "left-full -translate-x-3/4"
          }`}></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
