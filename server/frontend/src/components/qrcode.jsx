import React, { useEffect, useState } from "react";
import { Loading } from "./loading";
import styled from "styled-components";
import { prefetch } from "../shared/prefetch";
const MyLoading = styled(Loading)`
  width: 256px;
  height: 256px;
`;
export const Qrcode = ({ host, content }) => {
  const [image, setImage] = useState(null);
  host = host || "127.0.0.1";
  content = encodeURIComponent(content);
  const url = `http://${host}:8080/api/v1/qrcodes?content=${content}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    prefetch(url)
      .then(
        () => setImage(<img width="256" height="256" src={url} />),
        () => setError({})
      )
      .finally(() => setLoading(false));
  }, [url]);
  return loading ? (
    <MyLoading>加载中2</MyLoading>
  ) : error ? (
    <div>加载二维码出错</div>
  ) : (
    image
  );
};
