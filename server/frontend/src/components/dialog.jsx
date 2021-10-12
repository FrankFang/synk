import { createContext } from "react";
import { unmountComponentAtNode, render, createPortal } from "react-dom";
import styled from "styled-components";
import { AppContext } from "../shared/app_context";

const DialogOverlay = styled.div`
  position: fixed; z-index: 10; background: rgba(0,0,0,0.5); width: 100%;
  height: 100%; left: 0; top: 0;
`;
const DialogContent = styled.div`
  position: fixed; z-index: 11; min-width: 120px; min-height: 40px;
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

let lastDiv = null

const close = (div) => {
  if (!div) return
  unmountComponentAtNode(div);
  div.remove();
  lastDiv = null
};
export const createDialog = (content, options = {}) => {
  close(lastDiv)
  const { closeOnClickOverlay, context } = options;
  const div = lastDiv = document.createElement("div");
  div.className = "tempApp";
  document.body.append(div);
  const onClickOverlay = () => {
    if (closeOnClickOverlay) {
      close(div);
    }
  };
  render(
    <AppContext.Provider value={context}>
      <Dialog container={div} onClickOverlay={onClickOverlay}>
        {content}
      </Dialog>
    </AppContext.Provider>,
    div
  );
  return () => close(div);
};
