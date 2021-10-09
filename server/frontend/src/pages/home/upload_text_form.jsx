import React, { useContext, useState } from "react";
import {
  BigTextarea,
  Button,
  Form,
  showUploadingDialog,
  showUploadTextSuccessDialog,
} from "../../pages/home/components";
import { AppContext } from "../../shared/app_context";
import { Center } from "../../components/center";
import axios from "axios";

export const UploadTextForm = () => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    const close = showUploadingDialog();
    const {
      data: { content },
    } = await axios.post("http://127.0.0.1:8080/api/v1/texts", {
      raw: formData.raw,
    });
    close();
    showUploadTextSuccessDialog({ context, content });
  };
  return (
    <Form className="uploadForm" onSubmit={onSubmit}>
      <div className="row">
        <BigTextarea
          value={formData.raw}
          onChange={(e) => setFormData({ raw: e.target.value })}
        />
      </div>
      <Center className="row">
        <Button type="submit">上传</Button>
      </Center>
    </Form>
  );
};
