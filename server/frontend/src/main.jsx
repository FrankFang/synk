import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { Home } from "./pages/home";
import { Downloads } from "./pages/downloads";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from './shared/global_style'

const history = createBrowserHistory({ basename: "/static/" });
const theme = {
  borderColor: "#333",
  highlightColor: "#f5b70d",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to="/message" />
          <Route exact path="/downloads">
            <Downloads />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <div>404</div>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
