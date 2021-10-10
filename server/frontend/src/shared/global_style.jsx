import { createGlobalStyle, keyframes } from "styled-components";
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;
export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; padding: 0; margin: 0; }
  *::before, *::after {box-sizing: border-box;}
  body {
    font-size: 16px;
    font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }
  a {text-decoration: none; color: inherit;}
  img {max-width: 100%; max-height: 100%; }
  input, button {font: inherit;}
  ul, ol {list-style: none; }
  img{vertical-align: middle;}
  :focus{ outline: none; }

  // helpers
  .spin {
    animation: ${spin} 2s linear infinite;
  }
`;
