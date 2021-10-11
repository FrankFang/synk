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
  content = encodeURIComponent(content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!content) return;
    const url = `/api/v1/qrcodes?content=${content}`;
    setLoading(true);
    prefetch(url)
      .then(
        () => setImage(<img width="256" height="256" src={url} />),
        (e) => setError(e)
      )
      .finally(() => setLoading(false));
  }, [content]);
  return loading ? (
    <MyLoading>加载中</MyLoading>
  ) : error ? (
    <div>加载二维码出错：{JSON.stringify(error)}</div>
  ) : (
    image
  );
};
