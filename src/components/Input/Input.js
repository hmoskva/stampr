import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({ name, type, label, value, onChange, id, placeholder }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className={`${styles.Input} form-control mb-3`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
