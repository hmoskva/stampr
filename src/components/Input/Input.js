import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({
  name,
  type,
  label,
  value,
  onChange,
  id,
  placeholder,
  customClass,
}) => {
  return (
    <div className={customClass}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className={`${styles.Input} form-control mb-4`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  customClass: PropTypes.string,
};

export default Input;
