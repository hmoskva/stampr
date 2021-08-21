import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import Link from "../Link/Link";
import { logout } from "../../utils/firebase";

const Header = ({ src, links }) => {
  return (
    <nav className={`py-4 ${styles.Header}`}>
      <Link to="/" className="p-0">
        <img height="30" src={src} />
      </Link>
      <ul className="nav">
        {links.map(({ text, link }, index) => {
          return (
            <li key={index} className="nav-item">
              <Link label={text} to={link}></Link>
            </li>
          );
        })}
      </ul>
      <div className="d-flex">
        <Link to="/login">Log in</Link>
        <Button label="Sign Up" />
        <Button variant="danger" handleClick={() => logout()} label="Log out" />
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
