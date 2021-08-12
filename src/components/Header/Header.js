import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import Link from "../Link/Link";

const Header = ({ src, links }) => {
  return (
    <nav className={`py-4 ${styles.Header}`}>
      <img height="30" src={src} />
      <ul className="nav">
        {links.map(({ text, link }, index) => {
          return (
            <li key={index} className="nav-item">
              <Link label={text} link={link}></Link>
            </li>
          );
        })}
      </ul>
      <div className="d-flex">
        <Link>Log in</Link>
        <Button label="Sign Up" />
      </div>
    </nav>
  );
};

Header.propTypes = {
  src: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  src: "https://b2b.talkspace.com/hs-fs/hubfs/TS_nav_logo-1.png?width=2540&name=TS_nav_logo-1.png",
  links: [
    { text: "Home", link: "" },
    { text: "Princing", link: "" },
  ],
};

export default Header;
