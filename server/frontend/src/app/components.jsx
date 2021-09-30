import { createDialog } from "../components/dialog";
import styled, { createGlobalStyle } from "styled-components";
import * as React from 'react'
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box; padding: 0;
margin: 0;
  }
  *::before, *::after {box-sizing: border-box;}
  body {
    font-size: 16px;
    font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }
  a {text-decoration: none;}
  input {font: inherit;}
`;

export const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const BigTextarea = styled.textarea`
  width: 400px;
  max-width: 80vw;
  min-height: 160px;
  line-height: 20px;
  &.draging {
    border-color: red;
  }
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const showUploadSuccessDialog = (data) => {
  const close = createDialog(
    <Pop>
      <div>上传成功</div>
      <div>
        <img src={`http://127.0.0.1:8080${data.url}`} />
      </div>
      <button onClick={() => close()}>关闭</button>
    </Pop>
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
  return createDialog(
    <Loading>
      <svg>
        <use xlinkHref="#icon-loading" />
      </svg>
      <p>上传中</p>
    </Loading>
  );
};
const Pop = styled.div`
  padding: 16px;
`;
const Loading = styled(Center)`
  flex-direction: column;
  padding: 8px;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  > svg {
    animation: spin 3s ease-in-out infinite;
    width: 40px;
    height: 40px;
    margin: 16px;
  }
`;
