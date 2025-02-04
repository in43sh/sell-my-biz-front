const SelectField = ({ id, name, value, options, onChange, label }) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={value}
        onChange={onChange}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
