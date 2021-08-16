import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/scss/index.scss";
import IndexPage from "./pages/Index/Index";
// import Dice from "./components/Dice/Dice";
// import useDice from "./hooks/useDice";

function App() {
  // const face = useDice(3);
  return (
    // <Dice face={face} />

    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <IndexPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
