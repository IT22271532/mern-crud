import PropTypes from 'prop-types';
import './FormInput.css';

const FormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  errors = [],
  name,
  disabled = false
}) => {
  const hasErrors = errors && errors.length > 0;
  const inputClass = `form-control ${hasErrors ? 'is-invalid' : ''}`;

  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={inputClass}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {hasErrors && (
        <div className="invalid-feedback">
          {errors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default FormInput;