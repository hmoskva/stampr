import PropTypes from "prop-types";
import styles from "./Link.module.scss";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ label, to, children, disabled, className, onClick }) => {
  return (
    <RouterLink
      to={to}
      className={`${className} nav-link ${styles.Link} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick ? () => onClick() : () => ({})}
    >
      {children || label}
    </RouterLink>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string,
  to: PropTypes.string,
  disabled: PropTypes.bool,
};

Link.defaultProps = {
  label: "Link",
  disabled: false,
};

export default Link;
