const InputField = ({
  id,
  type,
  placeholder,
  value,
  error,
  onChange,
  label,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="form-control border-0 py-4"
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange(e)}
        required
      />
      {error && <p className="text-red">{error}</p>}
    </div>
  );
};

export default InputField;
