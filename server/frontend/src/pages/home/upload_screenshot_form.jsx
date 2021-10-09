import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  Form,
  showUploadingDialog,
  showUploadFileSuccessDialog,
} from "../../pages/home/components";
import { AppContext } from "../../shared/app_context";
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

export const UploadScreenshotForm = () => {
  const context = useContext(AppContext);
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
      context,
      content: (addr) =>
        addr &&
        `http://${addr}:8080/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:8080${url}`
        )}`,
    });
  };
  useEffect(() => {
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, []);
  const onChange = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const type = file.type || "unknown";
    const close = showUploadingDialog();
    const {
      data: { url },
    } = await uploadFile(file);
    close();
    showUploadFileSuccessDialog({
      context,
      content: (addr) =>
        addr &&
        `http://${addr}:8080/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:8080${url}`
        )}`,
    });
  };
  return (
    <Form className="uploadForm">
      <div className="row">
        <Box>
          <FileInput
            type="file"
            value=""
            onChange={onChange}
            accept="image/*;capture=camera"
          />
          <p>点击选择图片 或 直接粘贴图片</p>
        </Box>
      </div>
    </Form>
  );
};
const Box = styled.div`
  &.dragging {
    border-color: ${({ theme }) => theme.highlightColor};
    color: ${({ theme }) => theme.highlightColor};
  }
  min-height: 160px; border: 2px dashed ${({ theme }) => theme.borderColor}; 
  position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; border-radius: 8px;
`;
const FileInput = styled.input`
  position: absolute; right: 0; top: 0; width: 100%; height: 100%;
  opacity: 0; cursor: pointer;
`;
