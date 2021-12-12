import PropTypes from "prop-types";
import styles from "./Button.module.scss";
// import Icon from "../Icon/Icon";

const Button = ({
  className,
  handleClick,
  variant,
  disabled,
  type,
  block,
  rounded,
  ...props
}) => {
  const componentClass = `btn btn-${variant}`;
  const blockStyle = block
    ? {
        display: "block",
        width: "100%",
      }
    : null;
  const borderStyle = {
    borderRadius: rounded ? "999px" : "10px",
  };
  return (
    <button
      style={{ ...blockStyle, ...borderStyle }}
      className={`${styles.Button} ${className} ${componentClass}`}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {/* <Icon icon="play" /> */}
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  block: PropTypes.bool,
  rounded: PropTypes.bool,
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
