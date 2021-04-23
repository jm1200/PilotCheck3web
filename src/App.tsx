import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { NavBar } from "./components/NavBar";
import { Wrapper } from "./components/Wrapper";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">
          <Wrapper>
            <Login />
          </Wrapper>
        </Route>
        <Route path="/register">
          <Wrapper>
            <Register />
          </Wrapper>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
