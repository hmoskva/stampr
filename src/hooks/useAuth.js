import AuthContext from "./../contexts/AuthContext";
import { useContext, useState } from "react";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const [isAuthenticated] = useState(!!authContext.state.uid);
  const [user] = useState(authContext.state);
  return { user, isAuthenticated };
};

export default useAuth;
