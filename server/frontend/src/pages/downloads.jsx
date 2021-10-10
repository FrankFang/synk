import { useQuery } from "../hooks/use_query";
import { BigTextarea, Button, Header, Layout } from "./home/components";
import styled from "styled-components";
import { Center } from "../components/center";
import { Space } from "../components/space";

export const Downloads = () => {
  const query = useQuery()
  const type = simpifyType(query.type)
  const onClick = () => {
    navigator.clipboard.writeText(query.content)
  }

  let node = null
  switch (type) {
    case 'text':
      node = (
        <div>
          <BigTextarea readOnly value={query.content} />
          <Space />
          <Center>
            <Button onClick={onClick}>点击复制文本</Button>
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
  return (
    <Layout>
      <Header>同步传</Header>
      {node}
    </Layout>
  )
};
const Picture = styled.img`
  border: 2px solid ${({ theme }) => theme.borderColor};
  margin: 16px;
`

const simpifyType = type => {
  if (/^image\/.*$/.test(type)) {
    return 'image'
  } else if (/^text(\/.*)?$/.test(type)) {
    return 'text'
  } else {
    return 'file'
  }
}