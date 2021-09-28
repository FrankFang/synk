import React, { useState } from "react";
import { BigTextarea, Button, Center, Form, GlobalStyle, Layout } from "./App/components";
import axios from 'axios'


function App() {
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:8080/api/v1/materials', {
      category: 'text',
      raw: formData.raw 
    })
  };
  const [formData, setFormData] = useState({});

  return (
    <Layout>
      <GlobalStyle />
      <h1>同步传</h1>
      <div>{JSON.stringify(formData)}</div>
      <Form className="uploadForm" onSubmit={onSubmit}>
        <div className="row">
          <BigTextarea
            value={formData.raw}
            onChange={(e) => setFormData({ raw: e.target.value })}
          />
        </div>
        <Center className="row">
          <Button type="submit">上传</Button>
        </Center>
      </Form>
    </Layout>
  );
}

export default App;

// GOOS=macos GOARCH=darwin go build
