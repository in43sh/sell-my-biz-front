const InputField = ({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
  label,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        className={`form-control border-0 py-4 ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        // required
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;
