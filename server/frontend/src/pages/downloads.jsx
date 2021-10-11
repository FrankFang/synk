import { useQuery } from "../hooks/use_query";
import { BigTextarea, Button, Header, Layout } from "./home/components";
import styled from "styled-components";
import { Center } from "../components/center";
import { Space } from "../components/space";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { http } from "../shared/http";
import { history } from "../shared/history";

export const Downloads = () => {
  const query = useQuery()
  const type = normalizeType(query.type)
  const onClick = () => {
    navigator.clipboard.writeText(text)
    setVisible(true)
  }
  const [visible, setVisible] = useState(false)
  const timer = useRef(null)
  useEffect(() => {
    if (visible === true) {
      timer.current && clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setVisible(false)
      }, 3 * 1000);
    }
  }, [visible])

  const [text, setText] = useState("")
  useEffect(() => {
    if (type === "text") {
      http.get(query.url).then(({ data }) => {
        setText(data)
      })
    }
  }, [type])

  let node = null
  switch (type) {
    case 'text':
      node = (
        <div>
          <BigTextarea readOnly value={text} />
          <Space />
          <Center virtical>
            <Button onClick={onClick}>点击复制文本</Button>
            {visible ? <P>复制成功！</P> : null}
          </Center>
        </div>
      )
      break;
    case 'file':
      node = (
        <div>
          <a href={query.url}>点击下载文件</a>
        </div>
      )
      break;
    case 'image':
      node = (
        <div>
          <div>
            <Picture src={query.url} />
          </div>
          <div>
            <a href={query.url}>点击下载图片</a>
          </div>
        </div>
      )
      break;
  }
  const onClickUpload = () => {
    history.push("/")
  }
  return (
    <Layout>
      <Header>同步传</Header>
      {node}
      <Space x3 />
      <Center>
        <Button onClick={onClickUpload}>我也要上传</Button>
      </Center>
    </Layout>
  )
};
const Picture = styled.img`
  border: 2px solid ${({ theme }) => theme.borderColor};
  margin: 16px;
`
const P = styled.p`
  margin: 8px 0;
`

const normalizeType = type => {
  if (/^image\/.*$/.test(type)) {
    return 'image'
  } else if (/^text(\/.*)?$/.test(type)) {
    return 'text'
  } else {
    return 'file'
  }
}