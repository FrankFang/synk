import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { Home } from "./pages/home";
import { Downloads } from "./pages/downloads";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from './shared/global_style'
import { history } from "./shared/history";
import { init } from "./initializers";
import { getWsClient } from "./shared/ws_client";
import { clientId } from "./initializers/client_id";
import { createDialog } from "./components/dialog";
import { showUploadTextSuccessDialog } from "./pages/home/components";


const theme = {
  borderColor: "#333",
  highlightColor: "#f5b70d",
};

const Main = () => {
  init()
  useEffect(() => {
    getWsClient().then(c => {
      c.onMessage(data => {
        const { url, type } = data
        if (data.clientId === clientId) {
          if (type === 'text') {
            setTimeout(() => {
              showUploadTextSuccessDialog({
                content: `/static/downloads?type=text&url=${encodeURIComponent(url)}`
              })
            }, 100)
          }
        }
      })
    })
  }, [])

  return <ThemeProvider theme={theme}>
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
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
