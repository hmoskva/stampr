import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = (props) => {
  return (
    <button className={`${styles.Button} ${props.className}`}>
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
