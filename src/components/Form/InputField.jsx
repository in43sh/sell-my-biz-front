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
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        className={`w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
