import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  Form,
  showUploadingDialog,
  showUploadFileSuccessDialog,
  uploadFile,
} from "../../pages/home/components";
import { AppContext } from "../../shared/app_context";
export const UploadScreenshotForm = () => {
  const context = useContext(AppContext);
  const _uploadFile = async (file) => {
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
  }
  const onPaste = (e) => {
    const { items: [item] } = e.clipboardData;
    _uploadFile(item?.getAsFile())
  };
  useEffect(() => {
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, []);
  const onChange = async (e) => {
    _uploadFile(e.target?.files?.[0])
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
