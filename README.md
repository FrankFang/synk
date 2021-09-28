# 同步传接口文档

## post /api/v1/materials

params

1. category - text | image | file
2. raw - string | binary

return value

{
  resource: {
    id, category, content
  },
  errors: {
    category: ['类型不支持', '不能为空'],
    raw: ['太大','格式不正确'] 
  }
}
