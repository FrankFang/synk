import axios from "axios";
import { Switch, Route } from "react-router";
import { useEffect, useState } from "react";
import { AppContext } from "../shared/app_context";
import { Header, Layout } from "./home/components";
import { UploadTextForm } from "./home/upload_text_form";
import { UploadFileForm } from "./home/upload_file_form";
import { nav } from "./home/nav";
import { UploadScreenshotForm } from "./home/upload_screenshot_form";
import _ from "lodash";
import { http } from "../shared/http";

export function Home() {
  const [addresses, setAddresses] = useState([]);
  useEffect(async () => {
    const {
      data: { addresses },
    } = await http
      .get("/api/v1/addresses")
      .catch((e) => Promise.reject(e));
    setAddresses(_.uniq(addresses.concat("127.0.0.1")));
  }, []);
  return (
    <AppContext.Provider value={{ addresses }}>
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
          <Route exact path="/screenshot">
            <UploadScreenshotForm />
          </Route>
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
}
