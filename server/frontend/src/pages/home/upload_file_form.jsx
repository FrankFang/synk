import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  Form,
  showUploadingDialog,
  showUploadFileSuccessDialog,
  uploadFile,
} from "../../pages/home/components";
import { AppContext } from "../../shared/app_context";

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
    showUploadingDialog();
    const { data: { url } } = await uploadFile(file);
    showUploadFileSuccessDialog({
      context,
      content: (addr) =>
        addr &&
        `http://${addr}:27149/static/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:27149${url}`
        )}`,
    });
  };
  const onChange = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const type = file.type || "unknown";
    showUploadingDialog();
    const { data: { url } } = await uploadFile(file);
    showUploadFileSuccessDialog({
      context,
      content: (addr) =>
        addr &&
        `http://${addr}:27149/static/downloads?type=${type}&url=${encodeURIComponent(
          `http://${addr}:27149${url}`
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
