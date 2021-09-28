import React, { useState } from "react";
import cs from "classnames";
import {
  BigTextarea,
  Button,
  Center,
  Form,
  GlobalStyle,
  Layout,
} from "./App/components";
import axios from "axios";

function App() {
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8080/api/v1/texts", {
      raw: formData.raw,
    });
  };
  const [bigTextareClass, setBigTextareaClass] = useState("default");
  const [formData, setFormData] = useState({});
  const onDragOver = (e) => {
    setBigTextareaClass("draging");
  };
  const onDragLeave = (e) => {
    setBigTextareaClass("default");
  };
  const onDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.items);
    const data = e.dataTransfer.items[0];
    var blob = data.getAsFile();
    const x = new FormData();
    x.append("raw", blob);
    axios({
      method: 'post',
      url: "http://127.0.0.1:8080/api/v1/files",
      data: x,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <Layout onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <GlobalStyle />
      <h1>同步传</h1>
      <div>{JSON.stringify(formData)}</div>
      <Form className="uploadForm" onSubmit={onSubmit}>
        <div className="row">
          <BigTextarea
            className={cs(bigTextareClass)}
            value={formData.raw}
            onChange={(e) => setFormData({ raw: e.target.value })}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          />
        </div>
        <Center className="row">
          <Button type="submit">上传</Button>
        </Center>
      </Form>
    </Layout>
  );
}

export default App;

// GOOS=macos GOARCH=darwin go build
