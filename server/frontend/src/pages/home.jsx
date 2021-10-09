import axios from "axios";
import { Switch, Route } from "react-router";
import { useEffect, useState } from "react";
import { AppContext } from "../shared/app_context";
import { Layout } from "./home/components";
import { UploadTextForm } from "./home/upload_text_form";
import { UploadFileForm } from "./home/upload_file_form";
import styled from "styled-components";
import { GlobalStyle } from "../shared/global_style";
import { nav } from "./home/nav";

const Header = styled.h1`
  margin-top: 48px;
  margin-bottom: 32px;
  text-align: center;
`;
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
      <GlobalStyle />
      <Layout>
        <Header>同步传</Header>
        {nav}
        <Switch>
          <Route exact path="/message">
            <UploadTextForm />
          </Route>
          <Route exact path="/file">
            <UploadFileForm />
          </Route>
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
}
