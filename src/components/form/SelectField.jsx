// TODO
// TO BE DELETED
import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  id,
  name,
  options,
  value,
  onChange,
  label,
  tooltip,
  error,
}) => {
  return (
    <div className="relative mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
          {tooltip && (
            <span className="group relative ml-2 inline-block">
              <span className="cursor-pointer text-blue-600">&#9432;</span>
              <div className="invisible absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-md bg-gray-800 p-2 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800" />
              </div>
            </span>
          )}
        </label>
      )}
      <select
        id={id}
        name={name}
        className={`w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
        value={value || ''}
        onChange={onChange}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  error: PropTypes.string,
};

export default SelectField;
