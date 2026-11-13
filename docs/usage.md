# 使用说明

## 本地运行

在项目根目录执行：

```powershell
node server.mjs
```

服务只监听 `127.0.0.1`，默认地址为 `http://127.0.0.1:5173/`。停止服务可在终端按 `Ctrl+C`。

## 不接入外部服务

不设置任何环境变量也可以浏览成都内置热点、筛选地点、查看详情和生成本地攻略草稿。浏览器直接打开 `index.html` 时，页面会使用本地降级流程，API 功能不会启用。

## 接入外部服务

在启动命令所在 shell 中设置变量，例如：

```powershell
$env:PORT = "5173"
$env:DEEPSEEK_MODEL = "deepseek-chat"
$env:DEEPSEEK_API_KEY = "在本机设置的凭证"
$env:AMAP_API_KEY = "在本机设置的凭证"
node server.mjs
```

真实凭证只保存在本机环境或未纳入版本控制的本地配置中。不要把上述命令原样写入脚本、截图或提交记录。

## 可检查的接口

- `GET /` 返回页面
- `GET /api/amap/places?city=北京` 查询可选城市地点
- `POST /api/deepseek` 接收攻略消息并返回生成内容

接口返回的数据来自外部服务时，发布前应核验服务条款、配额和数据使用范围。

## 语法检查

```powershell
node --check app.js
node --check server.mjs
```
