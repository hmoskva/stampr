/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
// import authReducer, { initialState } from "../reducers/auth";
// import authReducer from "../features/userSlice";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(authReducer);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthContext;
