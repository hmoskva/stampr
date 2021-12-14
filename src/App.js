import { Route, Switch, useHistory } from "react-router-dom";
import "./assets/scss/index.scss";
import IndexPage from "./pages/Index/Index";
import LoginPage from "./pages/Authentication/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { auth } from "./config/firebase";

function App() {
  const router = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        router.push("/");
      } else {
        dispatch(logout());
        router.push("/login");
      }
    });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
