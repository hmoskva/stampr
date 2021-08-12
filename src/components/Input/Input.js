import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({ value, onChange }) => {
  return (
    <input
      className={`${styles.Input}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
