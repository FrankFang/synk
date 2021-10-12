import React, { useContext, useState } from "react";
import {
  BigTextarea,
  Button,
  Form,
  showUploadingDialog,
  showUploadTextSuccessDialog,
  uploadText,
} from "../../pages/home/components";
import { AppContext } from "../../shared/app_context";
import { Center } from "../../components/center";

export const UploadTextForm = () => {
  const context = useContext(AppContext);
  const [text, setText] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    showUploadingDialog();
    const { data: { url } } = await uploadText(text)
    showUploadTextSuccessDialog({
      context, content: (addr) => addr && `http://${addr}:27149/static/downloads?type=text&url=http://${addr + ":27149" + encodeURIComponent(url)}`
    });
  };
  return (
    <Form className="uploadForm" onSubmit={onSubmit}>
      <div className="row">
        <BigTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <Center className="row">
        <Button type="submit">上传</Button>
      </Center>
    </Form>
  );
};
