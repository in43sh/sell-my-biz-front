import PropTypes from 'prop-types';

const RadioGroup = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
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
            required={required}
          />
          <span className="ml-2 text-sm">{option}</span>
        </label>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default RadioGroup;
