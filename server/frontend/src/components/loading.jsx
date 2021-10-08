import { Center } from "./center";
import styled from "styled-components";

const _Loading = styled(Center)`
  flex-direction: column;
  padding: 8px;
  > svg {
    width: 40px;
    height: 40px;
    margin: 16px;
  }
`;

export const Loading = ({ children, className }) => {
  return (
    <_Loading className={className}>
      <svg className="spin">
        <use xlinkHref="#icon-loading" />
      </svg>
      <p>{children}</p>
    </_Loading>
  );
};
