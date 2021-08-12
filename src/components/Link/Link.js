import PropTypes from "prop-types";
import styles from "./Link.module.scss";

const Link = ({ label, link, children, disabled }) => {
  return (
    <a
      to={link}
      className={`nav-link ${styles.Link} ${disabled ? "disabled" : ""}`}
    >
      {children || label}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string,
  disabled: PropTypes.bool,
};

Link.defaultProps = {
  label: "Link",
  to: "www.google.com",
  disabled: false,
};

export default Link;
