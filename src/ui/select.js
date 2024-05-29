function Selection({ options, setValue, Val, title }) {
  return (
    <div className="grid grid-cols-3 py-2 align-middle">
      <div className="text-xl col-span-2">{title}</div>
      <div className="text-lg">
        <select
          name="select"
          onChange={(e) => setValue(e.target.value)}
          defaultValue={Val}>
          {options.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Selection;
