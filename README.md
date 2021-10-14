最近在学习 Go 语言，语法看得差不多了，想着找点什么项目做做，正好我一直想做一个「局域网PC与手机互传文件，且不想借助微信/QQ等骚扰软件」的软件，于是就用 Go 来做了，最终截图如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec2a8750433465db9460456857996f5~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d24db9c27f164183b04ee4ffa98617db~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbddd6a250004740901527cb3b5d10d7~tplv-k3u1fbpfcp-watermark.image?)

功能很简单：
1. PC 上传文字或文件后创建二维码，提供给手机浏览器扫码下载
2. 手机在浏览器上传文字或文件后自动用 websocket 通知给 PC 端，弹出下载提示

这里主要说一下实现思路。

# 实现思路

## 用 Loca 创建窗口

我了解到 Go 的如下库可以实现窗口：

1. [lorca](https://github.com/zserge/lorca) - 调用系统现有的 Chrome/Edge 实现简单的窗口，UI 通过 HTML/CSS/JS 实现
2. [webview](https://github.com/webview/webview) - 比 lorca 功能更强，实现 UI 的思路差不多
3. [fyne](https://github.com/fyne-io/fyne) - 使用 Canvas 绘制的 UI 框架，性能不错
4. [qt](https://github.com/therecipe/qt) - 更复杂更强大的 UI 框架

我随便挑了个最简单的 Lorca 就开始了。

## 用 HTML/CSS/JS 制作 UI 

我用 React + ReactRouter 来实现页面结构，文件上传和对话框是自己用原生 JS 写的，UI 细节用 CSS3 来做，没有依赖其他 UI 组件库。

Lorca 的主要功能就是展示我写的 index.html。

## 用 [gin](https://github.com/gin-gonic/gin) 实现后台接口

index.html 中的 JS 用到了五个接口，我使用 gin 来实现：

```
router.GET("/uploads/:path", controllers.UploadsController)              
router.GET("/api/v1/addresses", controllers.AddressesController) 
router.GET("/api/v1/qrcodes", controllers.QrcodesController)   
router.POST("/api/v1/files", controllers.FilesController)      
router.POST("/api/v1/texts", controllers.TextsController)
```

其中的二维码生成我用的是 [go-qrcode](https://github.com/skip2/go-qrcode)。

## 用 [gorilla/websocket](https://github.com/gorilla/websocket) 实现手机通知 PC

这个库提供了一个聊天室的例子，稍微改一下就能为我所用了。

## 整体思路

总得来说：

1. 用 Lorca 搞出一个窗口
2. 用 HTML 制作界面，用 JS 调用后台接口
3. 用 Gin 实现后台接口
4. 上传的文件都放到 uploads 文件夹中

共 400 行 Go 代码，700 行 JS 代码。

# 使用

目前我只测试了 Windows 系统，能正常运行。理论上 macOS 和 Linux 也能运行，但我并没有测试。

你可以在 [releases 页面](https://github.com/FrankFang/synk/releases) 下载可执行文件，也可以自行编译源代码得到可执行文件。

## Windows 用户须知

Windows 用户需要在防火墙的入站规则中运行 27149 端口的连接，否则此软件无法被手机访问。

# 编译

```
./scripts/build_for_mac.sh
./scripts/build_for_win.sh
```

