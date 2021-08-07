import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({
  className,
  handleClick,
  variant,
  disabled,
  block,
  ...props
}) => {
  const componentClass = `btn btn-${variant}`;
  const blockStyle = {
    display: "block",
    width: "100%",
  };
  return (
    <button
      style={block ? blockStyle : null}
      className={`${styles.Button} ${className} ${componentClass}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "primary",
  label: "Submit",
  block: false,
  disabled: false,
  className: "",
};
export default Button;
