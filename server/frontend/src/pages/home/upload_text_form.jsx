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
import { http } from "../../shared/http";

export const UploadTextForm = () => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({ raw: "" });
  const onSubmit = async (e) => {
    e.preventDefault();
    const close = showUploadingDialog();
    const {
      data: { url },
    } = await http.post("/api/v1/texts", {
      raw: formData.raw,
    })
    close();
    showUploadTextSuccessDialog({
      context, content: (addr) => addr && `http://${addr}:8080/static/downloads?type=text&url=http://${addr + ":8080" + encodeURIComponent(url)}`
    });
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
