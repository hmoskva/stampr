import PropTypes from "prop-types";
import styles from "./Link.module.scss";

const Link = ({ label, children, disabled }) => {
  return (
    <a className={`nav-link ${styles.Link} ${disabled ? "disabled" : ""}`}>
      {children || label}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

Link.defaultProps = {
  label: "Link",
  disabled: false,
};

export default Link;
