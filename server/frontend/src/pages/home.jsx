import React, { useEffect, useState } from "react";
import { GlobalStyle, Layout } from "./home_components";
import axios from "axios";
import { AppContext } from "src/shared/app_context";
import { UploadTextForm } from "./home/upload_text_form";
import {Switch, Route} from 'react-router'

export function Home() {
  const [addresses, setAddresses] = useState([]);
  useEffect(async () => {
    const {
      data: { addresses },
    } = await axios
      .get("http://127.0.0.1:8080/api/v1/addresses")
      .catch((e) => Promise.reject(e));
    setAddresses(addresses);
  }, []);
  return (
    <AppContext.Provider value={addresses}>
      <Layout>
        <GlobalStyle />
        <h1>同步传</h1>
        <Switch>
          <Route exact path="/">
            <UploadTextForm />
          </Route>
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
}
