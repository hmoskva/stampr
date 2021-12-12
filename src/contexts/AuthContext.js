/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import authReducer, { initialState } from "../reducers/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
