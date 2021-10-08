import React, { useContext, useState } from "react";
import cs from "classnames";
import {
  BigTextarea,
  Button,
  Form,
  showUploadingDialog,
  showUploadTextSuccessDialog,
  showUploadFileSuccessDialog,
} from "../../pages/home/components";
import { AppContext } from "../../shared/app_context";
import { Center } from "../../components/center";
import axios from "axios";
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

export const UploadTextForm = () => {
  const { addresses } = useContext(AppContext);
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
    const file = e.dataTransfer?.items?.[0]?.getAsFile();
    if (!file) return;
    const type = file.type || "unknown";
    const close = showUploadingDialog();
    const {
      data: { url },
    } = await uploadFile(file);
    close();
    showUploadFileSuccessDialog({
      addresses,
      content: (addr) =>
        addr &&
        `http://${addr}:8080/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:8080${url}`
        )}`,
    });
  };
  const onPaste = async (e) => {
    const {
      items: [item],
    } = e.clipboardData;
    const file = item?.getAsFile();
    if (!file) return;
    const type = file.type || "unknown";
    const close = showUploadingDialog();
    const {
      data: { url },
    } = await uploadFile(file);
    close();
    showUploadFileSuccessDialog({
      addresses,
      content: (addr) =>
        addr &&
        `http://${addr}:8080/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:8080${url}`
        )}`,
    });
  };
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
  return (
    <Form
      className="uploadForm"
      onSubmit={onSubmit}
      onPaste={onPaste}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
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
  );
};
