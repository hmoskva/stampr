import styles from "./Authentication.module.scss";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import extractUserInfo from "../../utils/extractUserInfo";
import { auth, provider } from "../../config/firebase";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const dispatch = useDispatch();

  const googleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(login(extractUserInfo(user)));
      })
      .catch((error) => alert(error.message));
  };

  const form = (
    <>
      <h1 className="my-auto fw-bold">{showLogin ? "Login" : "Register"}</h1>
      <p className="mb-4 mt-2">{showLogin ? "" : "Let's get you started!"}</p>
      <Button
        rounded
        variant="outline-secondary"
        block
        label={showLogin ? "Sign in with Google" : "Sign up with Google"}
        handleClick={googleLogin}
      ></Button>
      <div className="horizontal-text my-5">
        <span className="text-muted small">
          or sign {showLogin ? "in" : "up"} with email
        </span>
      </div>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );

  return (
    <div className={`px-3 px-md-0`}>
      <div className={`row align-items-center ${styles.Main}`}>
        <div className="col-12 col-md-6 px-md-7 px-xl-10 ">
          {form}
          <div className="small d-flex align-items-center mt-3">
            {showLogin ? `Not registered yet?` : `Already have an account?`}
            <Link
              className={"px-1"}
              onClick={() => {
                setShowLogin(!showLogin);
              }}
            >
              {showLogin ? `Create an account` : `Login now`}
            </Link>
          </div>
        </div>
        <div
          className={`d-none d-md-block col-12 col-md-6 h-100 ${styles["Auth-bg"]}`}
        ></div>
      </div>
    </div>
  );
};

export default LoginPage;
