import React, { useContext, useEffect, useRef, useState } from "react";
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
import { showUploadFileSuccessDialog, showUploadTextSuccessDialog } from "./pages/home/components";
import { http } from "./shared/http";
import _ from "lodash";
import { AppContext } from "./shared/app_context";


const theme = {
  borderColor: "#333",
  highlightColor: "#f5b70d",
};

const Main = () => {
  init()
  const addressesRef = useRef(null);
  const context = { addressesRef }
  useEffect(async () => {
    const {
      data: { addresses },
    } = await http
      .get("/api/v1/addresses")
      .catch((e) => Promise.reject(e));
    addressesRef.current = _.uniq(addresses.concat("127.0.0.1"));
  }, []);

  useEffect(() => {
    getWsClient().then(c => {
      c.onMessage(data => {
        const { url, type } = data
        if (data.clientId !== clientId) {
          const content = (addr) => addr && `http://${addr}:27149/static/downloads?type=${type}&url=${encodeURIComponent(`http://${addr}:27149${url}`)}`
          if (type === 'text') {
            showUploadTextSuccessDialog({ context, content });
          } else {
            showUploadFileSuccessDialog({ context, content });
          }
        }
      })
    })
  }, [])
  return <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AppContext.Provider value={context}>
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
    </AppContext.Provider>
  </ThemeProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
