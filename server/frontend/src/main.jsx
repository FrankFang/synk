import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { Home } from "./pages/home";
import { Downloads } from "./pages/downloads";
import { ThemeProvider } from "styled-components";

const history = createBrowserHistory({ basename: "/static/" });
const theme = {
  borderColor: "#333",
  highlightColor: "#f5b70d",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
