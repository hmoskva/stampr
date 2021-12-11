import { Route, Switch, useHistory } from "react-router-dom";
import "./assets/scss/index.scss";
import IndexPage from "./pages/Index/Index";
import LoginPage from "./pages/Authentication/Login";
import { useEffect, useReducer } from "react";
import firebase, { auth } from "./utils/firebase";
// import authReducer, { initialState } from "./reducers/auth";
import { useDispatch } from "react-redux";
import { loginGoogle, logoutRedux } from "./features/userSlice";

function App() {
  // const face = useDice(3);
  const router = useHistory();

  // const [, dispatch] = useReducer(authReducer, initialState);
  // console.log("🚀 ~ App ~ state", state);

  // useEffect(() => {
  //   if (firebase) {
  //     firebase.auth().onAuthStateChanged((authUser) => {
  //       if (authUser) {
  //         const user = {
  //           name: authUser.displayName,
  //           email: authUser.email,
  //           uid: authUser.uid,
  //         };
  //         localStorage.setItem("user", JSON.stringify(user));
  //         dispatch({
  //           type: "SET_USER",
  //           payload: {
  //             ...user,
  //           },
  //         });
  //         router.push("/");
  //       } else {
  //         localStorage.removeItem("user");
  //         dispatch({ type: "RESET_USER" });
  //         router.push("/login");
  //       }
  //     });
  //   }
  // }, []);

  // const user = useSelector(selectUser);
  const googleDispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //user logged in
        googleDispatch(
          loginGoogle({
            displayName: user.displayName,
            email: user.email,
          })
        );
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
        localStorage.removeItem("user");
        googleDispatch(logoutRedux());
        router.push("/login");
      }
    });
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
