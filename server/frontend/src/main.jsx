import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { Home } from "./pages/home";
import { Downloads } from "./pages/downloads";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/message" />
        <Route exact path="/downloads">
          <Downloads />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
