import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import Link from "../Link/Link";
import { logout } from "../../utils/firebase";
// import AuthContext from "../../contexts/AuthContext";
// import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import logoutRedux from "../../features/userSlice";
// import { useContext } from "react";
// import AuthContext from "../../contexts/AuthContext";

const Header = ({ src, links }) => {
  const { user, isAuthenticated } = useAuth();
  console.log("🚀 ~ Header ~ user", user);
  console.log("🚀 ~ Header ~ isAuthenticated", isAuthenticated);

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
        {isAuthenticated ? (
          <div className="d-flex align-items-center">
            <p className="small mb-0 me-2">
              Hello, {user.displayName || user.email}
            </p>
            <Button
              variant="danger"
              handleClick={async () => {
                await logout();
                // logoutRedux({});
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
  src: "https://b2b.talkspace.com/hs-fs/hubfs/TS_nav_logo-1.png?width=2540&name=TS_nav_logo-1.png",
  links: [
    { text: "Home", link: "" },
    { text: "Princing", link: "" },
  ],
};

export default Header;
