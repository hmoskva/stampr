import PropTypes from "prop-types";
// import styles from "./Footer.module.scss";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import GithubIcon from "../Icon/icons/github";
import Link from "../Link/Link";

const Footer = ({ footerLinks }) => {
  return (
    <div className={`mt-2`}>
      <ul className="d-flex justify-content-end">
        {footerLinks.map(({ icon, link }, index) => {
          return (
            <li key={index} className="nav-item d-flex align-items-center">
              <a title="Github" href="https://github.com/hmoskva/stampr">
                {icon}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Footer.propTypes = {
  // src: PropTypes.string,
  footerLinks: PropTypes.arrayOf(PropTypes.object),
};

Footer.defaultProps = {
  footerLinks: [{ icon: <GithubIcon />, link: "" }],
};

export default Footer;
