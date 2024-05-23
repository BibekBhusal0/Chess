function Selection({ options, setValue, Val, title }) {
  return (
    <div className="flex gap-7">
      <div className="text-xl">{title}</div>
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
