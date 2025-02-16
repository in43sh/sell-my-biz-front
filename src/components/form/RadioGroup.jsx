const RadioGroup = ({ id, label, options, value, onChange, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="radio"
            name={id}
            value={option}
            checked={value === option}
            onChange={onChange}
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm">{option}</span>
        </label>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default RadioGroup;
