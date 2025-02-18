import PropTypes from 'prop-types';

const Checkbox = ({ id, name, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) =>
          onChange({ target: { name, value: e.target.checked } })
        }
        className="h-5 w-5 cursor-pointer text-blue-600"
      />
      <label htmlFor={id} className="ml-2 cursor-pointer text-sm font-medium">
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
