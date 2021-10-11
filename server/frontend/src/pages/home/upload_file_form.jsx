import React, { useContext, useState } from "react";
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
  return http({
    method: "post",
    url: "/api/v1/files",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UploadFileForm = () => {
  const context = useContext(AppContext);
  const [boxClass, setBoxClass] = useState("default");
  const onDragOver = (e) => {
    e.preventDefault();
    setBoxClass("dragging");
  };
  const onDragLeave = (e) => {
    setBoxClass("default");
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
      context,
      content: (addr) =>
        addr &&
        `http://${addr}:8080/static/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:8080${url}`
        )}`,
    });
  };
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
        `http://${addr}:8080/static/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:8080${url}`
        )}`,
    });
  };
  return (
    <Form className="uploadForm">
      <div className="row">
        <Box
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={boxClass}
        >
          <FileInput type="file" value="" onChange={onChange} />
          <p>点击打开文件 或 拖拽文件至此</p>
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
