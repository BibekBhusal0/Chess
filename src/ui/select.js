function Selection({ options, setValue, Val, title }) {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 py-2 align-middle">
      <div className="text-xl md:text-lg lg:text-xl col-span-2">{title}</div>
      <div className="text-lg relative">
        <select
          className="px-2 py-1 rounded-lg border-2 border-gray-600  hover:border-red-900 focus:border-blue-600 transition-all"
          name="select"
          onChange={(e) => setValue(e.target.value)}
          value={Val}>
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
