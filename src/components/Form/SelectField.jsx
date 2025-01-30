const SelectField = ({ id, name, value, options, onChange, label }) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        className="form-control border-0 py-4"
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
