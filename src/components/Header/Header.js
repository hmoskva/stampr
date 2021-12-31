import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import Link from "../Link/Link";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../services/auth";
import logoSrc from "../../assets/images/logo.svg";

const Header = ({ src, links }) => {
  const { user } = useAuth();
  console.log(`userHEader`, user);
  const { displayName, email } = user || {};
  return (
    <nav className={`py-4 ${styles.Header}`}>
      <Link to="/" className="p-0">
        <img height="45" src={src} />
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
        {user?.uid ? (
          <div className="d-flex align-items-center">
            <p className="small mb-0 me-2">Hello, {displayName || email}</p>
            <Button
              variant="danger"
              handleClick={async () => {
                await logout();
              }}
              label="Log out"
            />
          </div>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Button label="Sign Up" />
          </>
        )}
      </div>
    </nav>
  );
};

Header.propTypes = {
  src: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  src: logoSrc,
  links: [
    { text: "Home", link: "" },
    { text: "Princing", link: "" },
  ],
};

export default Header;
