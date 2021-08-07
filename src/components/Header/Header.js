import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import Link from "../Link/Link";

const Header = ({ src }) => {
  return (
    <nav className={`py-4 ${styles.Header}`}>
      <img height="30" src={src} />
      <ul className="nav">
        <li className="nav-item">
          <Link>Home</Link>
        </li>
        <li className="nav-item">
          <Link disabled>Pricing</Link>
        </li>
        <li className="nav-item">
          <Link>FAQs</Link>
        </li>
        <li className="nav-item">
          <Link>Terms</Link>
        </li>
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
};

Header.defaultProps = {
  src: "https://b2b.talkspace.com/hs-fs/hubfs/TS_nav_logo-1.png?width=2540&name=TS_nav_logo-1.png",
};

export default Header;
