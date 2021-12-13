import React from "react";
import Input from "../Input/Input";
import Link from "../Link/Link";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import { firebaseLogin } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import extractUserInfo from "../../utils/extractUserInfo";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      throw new Error("Fill in email and password");
    }

    firebaseLogin({ email, password })
      .then((user) => {
        dispatch(login(extractUserInfo(user)));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        placeholder="hi@gmail.com"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></Input>
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></Input>
      {error && <p className="text-center mt-4 fw-bold text-danger">{error}</p>}
      <Link className="pt-0 fs-6 text-end mb-3">Forgot Password?</Link>
      <Button type="submit" rounded block label="Login"></Button>
    </form>
  );
};

LoginForm.propTypes = {
  //   handleSubmit: PropTypes.func,
};

export default LoginForm;
