function LeftPanel() {
  return (
    <div className=" col-span-2 pr-3 border-r-8">
      <div className=" text-xl pb-11">
        Just sample left panel work no ready yet
      </div>
      <div>color</div>
      <div className=" border-b-4 pb-5">theme</div>
      <div className=" text-lg"> stockfish settings</div>
      <div className="flex">
        <div> depth </div>
        <input
          type="number"
          name="number"
          id="number"
          value={4}
          className="  bg-red-100"
        />
      </div>
    </div>
  );
}

export default LeftPanel;
