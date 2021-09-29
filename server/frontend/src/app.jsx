import React, { useState } from "react";
import cs from "classnames";
import styled from 'styled-components'
import {
  BigTextarea,
  Button,
  Center,
  Form,
  GlobalStyle,
  Layout,
} from "./app/components";
import axios from "axios";
import { createDialog } from "./components/dialog";

const uploadFile = (blob) => {
  const formData = new FormData();
  formData.append("raw", blob);
  return axios({
    method: "post",
    url: "http://127.0.0.1:8080/api/v1/files",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const Pop = styled.div`
  padding: 16px;
`
function App() {
  const onSubmit = (e) => {
    e.preventDefault();
    return axios
      .post("http://127.0.0.1:8080/api/v1/texts", {
        raw: formData.raw,
      })
      .then(({data}) => {
        const close = createDialog(
          <Pop>
            <div>上传成功</div>
            <div>
              <img src={`http://127.0.0.1:8080${data.url}`} alt="" />
            </div>
            <button onClick={() => close()}>关闭</button>
          </Pop>
        );
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
    const blob = e.dataTransfer?.items?.[0]?.getAsFile();
    if (!blob) return;
    uploadFile(blob);
  };
  const onPaste = (e) => {
    const {
      items: [item],
    } = e.clipboardData;
    uploadFile(item.getAsFile());
  };

  return (
    <Layout
      onPaste={onPaste}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
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
