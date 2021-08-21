// import Header from "../../components/Header/Header";
import styles from "./Authentication.module.scss";
import Input from "../../components/Input/Input";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { login, register } from "../../utils/firebase";
// import { useHistory } from "react-router-dom";
// import AuthContext from "../../contexts/AuthContext";
// import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const initialCredentials = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState(null);
  // const router = useHistory();

  const changeValue = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showLogin) {
      const { email, password } = credentials;
      login({ email, password })
        .then(() => {
          //success
          // localStorage.setItem("user", JSON.stringify(state));
          // router.push("/");
        })
        .catch((error) => {
          console.log("error :>> ", error);
          // localStorage.removeItem("user");
          setError(error.message);
        });
    } else {
      register(credentials)
        .then(() => {
          //success
          // localStorage.setItem("user", state);
          // router.push("/");
        })
        .catch((error) => {
          console.log("error :>> ", error);
          // localStorage.removeItem("user");
          setError(error.message);
        });
    }
  };

  const errorBlock = (
    <p className="text-center mt-4 fw-bold text-danger">{error}</p>
  );
  const form = showLogin ? (
    <>
      {/* Login */}
      <h1 className="my-auto fw-bold">Login ✌🏿</h1>
      <p className="mb-4">Login and let us get you back to uploading</p>
      <Button
        rounded
        variant="outline-secondary"
        block
        label="Sign in with Google"
      ></Button>
      <div className="horizontal-text my-5">
        <span className="text-muted small">or sign in with email</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          placeholder="Enter your Email"
          type="email"
          onChange={changeValue}
          value={credentials.email}
        ></Input>
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your Password"
          onChange={changeValue}
          value={credentials.password}
        ></Input>
        {/* Error */}
        {errorBlock}
        <Link className="pt-0 fs-6 text-end mb-3">Forgot Password?</Link>
        <Button type="submit" rounded block label="Login"></Button>
      </form>
    </>
  ) : (
    <>
      {/* Register */}
      <h1 className="my-auto fw-bold">Register ✌🏿</h1>
      <p className="mb-4">Let us get you started!</p>
      <Button
        rounded
        variant="outline-secondary"
        block
        label="Sign up with Google"
      ></Button>
      <div className="horizontal-text my-5">
        <span className="text-muted small">or sign up with email</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          name="first_name"
          placeholder="Enter your first name"
          type="text"
          onChange={changeValue}
          value={credentials.first_name}
        ></Input>
        <Input
          label="Last Name"
          name="last_name"
          placeholder="Enter your last name"
          type="text"
          onChange={changeValue}
          value={credentials.last_name}
        ></Input>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your Email"
          onChange={changeValue}
          value={credentials.email}
        ></Input>
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your Password"
          onChange={changeValue}
          value={credentials.password}
        ></Input>
        {/* Error */}
        {errorBlock}
        <Button type="submit" rounded block label="Register"></Button>
      </form>
    </>
  );

  return (
    <div className={`px-3 px-md-0`}>
      <div className={`row align-items-center ${styles.Main}`}>
        <div className="col-12 col-md-6 px-md-7 px-xl-10 ">
          {/* Login Form */}
          {form}
          {/* Toggle Button */}
          <div className="small d-flex align-items-center">
            {showLogin ? `Not registered yet?` : `Already have an account?`}
            <Link
              className={"px-1"}
              onClick={() => {
                setError(null);
                setShowLogin(!showLogin);
                setCredentials({ ...initialCredentials });
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
