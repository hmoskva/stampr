import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import { register } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import extractUserInfo from "../../utils/extractUserInfo";

const RegisterForm = () => {
  const initialCredentials = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const changeValue = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      throw new Error("Fill in email and password");
    }

    register(credentials)
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
        label="First Name"
        name="first_name"
        placeholder=""
        type="text"
        onChange={changeValue}
        value={credentials.first_name}
      ></Input>
      <Input
        label="Last Name"
        name="last_name"
        type="text"
        onChange={changeValue}
        value={credentials.last_name}
      ></Input>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="john@gmail.com"
        onChange={changeValue}
        value={credentials.email}
      ></Input>
      <Input
        label="Password"
        name="password"
        type="password"
        onChange={changeValue}
        value={credentials.password}
      ></Input>
      {error && <p className="text-center mt-4 fw-bold text-danger">{error}</p>}
      <Button type="submit" rounded block label="Register"></Button>
    </form>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
