import { Switch, Route } from "react-router";
import { Header, Layout } from "./home/components";
import { UploadTextForm } from "./home/upload_text_form";
import { UploadFileForm } from "./home/upload_file_form";
import { nav } from "./home/nav";
import { UploadScreenshotForm } from "./home/upload_screenshot_form";

export function Home() {
  return (
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
  );
}
