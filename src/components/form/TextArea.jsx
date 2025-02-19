import PropTypes from 'prop-types';

const TextArea = ({
  id,
  name,
  value,
  placeholder,
  label,
  error,
  onChange,
  required = false,
  disabled = false,
  rows = 4,
}) => {
  return (
    <div className="relative mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        className={`w-full resize-none rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none ${
          error ? 'border-red-500' : ''
        } ${
          disabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-500'
            : 'border-gray-300'
        }`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        {...(required ? { required: true } : {})}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextArea;
