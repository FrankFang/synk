import styled, { createGlobalStyle } from "styled-components";
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