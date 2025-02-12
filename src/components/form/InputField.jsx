import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
  label,
  tooltip,
  required = false,
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
          {tooltip && (
            <span className="group relative ml-2 inline-block">
              {/* Info icon */}
              <span className="cursor-pointer text-blue-600">&#9432;</span>
              {/* Tooltip container */}
              <div className="invisible absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-md bg-gray-800 p-2 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {tooltip}
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800" />
              </div>
            </span>
          )}
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
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;
