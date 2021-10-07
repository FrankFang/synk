import React, { useState, useEffect } from "react";
import cs from "classnames";
import {
  BigTextarea,
  Button,
  Form,
  GlobalStyle,
  Layout,
  showUploadingDialog,
  showUploadTextSuccessDialog,
  showUploadFileSuccessDialog,
} from "./app/components";
import axios from "axios";
import { AppContext } from "./shared/app_context";
import { Center } from "./components/center";

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

function App() {
  const [addresses, setAddresses] = useState([]);
  useEffect(async () => {
    const {
      data: { addresses },
    } = await axios
      .get("http://127.0.0.1:8080/api/v1/addresses")
      .catch((e) => Promise.reject(e));
    setAddresses(addresses);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const close = showUploadingDialog();
    const {
      data: { content },
    } = await axios.post("http://127.0.0.1:8080/api/v1/texts", {
      raw: formData.raw,
    });
    close();
    showUploadTextSuccessDialog({ addresses, content });
  };
  const [bigTextareClass, setBigTextareaClass] = useState("default");
  const [formData, setFormData] = useState({});
  const onDragOver = (e) => {
    setBigTextareaClass("draging");
  };
  const onDragLeave = (e) => {
    setBigTextareaClass("default");
  };
  const onDrop = async (e) => {
    e.preventDefault();
    const blob = e.dataTransfer?.items?.[0]?.getAsFile();
    if (!blob) return;
    const close = showUploadingDialog();
    const {
      data: { url },
    } = await uploadFile(blob);
    close();
    showUploadFileSuccessDialog({
      addresses,
      content: (addr) => addr && `http://${addr}:8080${url}`,
    });
  };
  const onPaste = (e) => {
    const {
      items: [item],
    } = e.clipboardData;
    const file = item?.getAsFile();
    if (!file) return;
    uploadFile(file);
  };

  return (
    <AppContext.Provider value={addresses}>
      <Layout
        onPaste={onPaste}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <GlobalStyle />
        <h1>同步传</h1>
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
    </AppContext.Provider>
  );
}

export default App;

// GOOS=macos GOARCH=darwin go build
