import { unmountComponentAtNode, render, createPortal } from "react-dom";
import React from "react";
import styled from "styled-components";

const DialogOverlay = styled.div`
  position: fixed; z-index: 10; background: rgba(0,0,0,0.5); width: 100%;
  height: 100%; left: 0; top: 0;
`;
const DialogContent = styled.div`
  position: fixed;
  z-index: 11;
  width: 200px;
  height: 300px;
  background: white;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
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
