import { Route, Switch, useHistory } from "react-router-dom";
import "./assets/scss/index.scss";
import IndexPage from "./pages/Index/Index";
import LoginPage from "./pages/Authentication/Login";
import { useEffect } from "react";
import firebase from "./utils/firebase";
// import Dice from "./components/Dice/Dice";
// import useDice from "./hooks/useDice";

function App() {
  // const face = useDice(3);
  const router = useHistory();

  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          localStorage.setItem("user", JSON.stringify(authUser));
          router.push("/");
        } else {
          localStorage.removeItem("user");
          router.push("/login");
        }
      });
    }
  }, []);

  return (
    // <Dice face={face} />
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
