import { unmountComponentAtNode, render, createPortal } from "react-dom";
import React from "react";
import styled from "styled-components";

const DialogOverlay = styled.div`
  position: fixed; z-index: 10; background: rgba(0,0,0,0.5); width: 100%;
  height: 100%; left: 0; top: 0;
`;
const DialogContent = styled.div`
  position: fixed; z-index: 11; min-width: 200px; min-height: 100px;
  max-width: 100%; max-height: 100%; background: white; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
`;

export const Dialog = ({ container, onClickOverlay, children }) => {
  return createPortal(
    <>
      <DialogOverlay onClick={onClickOverlay} />
      <DialogContent>{children}</DialogContent>
    </>,
    container ?? document.body
  );
};

export const createDialog = (content) => {
  const div = document.createElement("div");
  div.className = "tempApp";
  document.body.append(div);
  const onClickOverlay = () => {
    close();
  };
  render(
    <Dialog container={div} onClickOverlay={onClickOverlay}>
      {content}
    </Dialog>,
    div
  );
  const close = () => {
    unmountComponentAtNode(div);
    div.remove();
  };
  return close;
};
