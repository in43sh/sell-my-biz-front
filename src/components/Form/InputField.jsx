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
      {/* Render label if provided */}
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      {/* Input field */}
      <input
        id={id}
        name={name} // Ensure this is passed to correctly identify the field
        type={type}
        className={`form-control border-0 py-4 ${error ? 'is-invalid' : ''}`} // Add is-invalid class for Bootstrap error styling
        placeholder={placeholder}
        value={value || ''} // Default to an empty string if value is undefined
        onChange={onChange} // Pass the onChange handler directly
        required
      />

      {/* Error message */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;
