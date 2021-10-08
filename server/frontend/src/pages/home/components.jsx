import { createDialog } from "../../components/dialog";
import styled from "styled-components";
import React, { useState } from "react";
import { Qrcode } from "../../components/qrcode";
import { Loading } from "../../components/loading";

export const Layout = styled.div`
  min-height: 100vh; display: flex; align-items: stretch; flex-direction: column;
  padding: 0 16px; margin: 0 auto;
  @media (min-width: 414px) {
    max-width: 600px; 
  }
`;
export const BigTextarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  line-height: 20px;
  &.draging {
    border-color: red;
  }
`;
export const Button = styled.button`
  min-height: 40px;
  padding: 0 60px;
  border: 2px solid #666;
  background: #f5b70d;
  border-radius: 8px;
`;
export const Form = styled.form`
  &> .row {
    margin: 16px 0;
  }
`;

const Span = styled.span`
  margin-right: 8px;
`;
const Label = styled.label`
  display: flex; padding: 4px 0; margin: 4px 0;
  justify-content: flex-start; align-items: center;
  min-height: 40px;
`;
const UploadSuccessDialog = ({ addresses, content, onClose }) => {
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const onChange = (e) => {
    setAddress(e.target.value);
    localStorage.setItem("address", e.target.value);
  };
  return (
    <Pop>
      <div>上传成功</div>
      <div>
        <Label>
          <Span>请选择当前局域网IP</Span>
          <select value={address} onChange={onChange}>
            <option value="" disabled>
              - 请选择 -
            </option>
            {addresses.map((string) => (
              <option key={string}>{string}</option>
            ))}
          </select>
        </Label>
      </div>
      <div>
        {content ? (
          <Qrcode
            content={typeof content === "string" ? content : content(address)}
          />
        ) : null}
      </div>
      <button onClick={onClose}>关闭</button>
    </Pop>
  );
};
export const showUploadTextSuccessDialog = ({ addresses, content }) => {
  const close = createDialog(
    <UploadSuccessDialog
      addresses={addresses}
      content={content}
      onClose={() => close()}
    />
  );
};
export const showUploadFileSuccessDialog = ({ addresses, content }) => {
  const close = createDialog(
    <UploadSuccessDialog
      addresses={addresses}
      content={content}
      onClose={() => close()}
    />
  );
};
export const showUploadFailDialog = () => {
  const close = createDialog(
    <Pop>
      <div>上传失败</div>
      <button onClick={() => close()}>关闭</button>
    </Pop>
  );
};
export const showUploadingDialog = () => {
  return createDialog(<Loading>上传中</Loading>);
};
const Pop = styled.div`
  padding: 16px;
`;
