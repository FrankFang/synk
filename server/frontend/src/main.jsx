import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Home } from "./pages/home";
import { Downloads } from "./pages/downloads";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/downloads">
          <Downloads />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
