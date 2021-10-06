import React, { useEffect, useState } from "react";
import { Loading } from "./loading";
import styled from "styled-components";
import { prefetch } from "../shared/prefetch";
const MyLoading = styled(Loading)`
  width: 256px;
  height: 256px;
`;
export const Qrcode = ({ content }) => {
  const [image, setImage] = useState(null);
  const url = `http://127.0.0.1:8080/api/v1/qrcodes?content=${encodeURIComponent(
    content
  )}`;
  useEffect(() => {
    prefetch(url).then(
      () => setImage(<img width="256" height="256" src={url} />),
      () => {}
    );
  }, []);
  return image ?? <MyLoading>加载中2</MyLoading>;
};
