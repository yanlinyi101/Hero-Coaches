# 运行指南

## 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 安装依赖

```bash
pnpm install
```

## 开发模式

### 方式一：同时启动所有服务

```bash
pnpm dev
```

### 方式二：分别启动各个服务

```bash
# 终端 1: 启动 API 服务器（端口 4000）
pnpm --filter api dev

# 终端 2: 启动 Web 应用（端口 3000）
pnpm --filter web dev

# 终端 3: Worker CLI（按需运行）
pnpm --filter worker dev <video-path>

# 终端 4: Overlay 开发服务器（端口 5173）
pnpm --filter overlay dev
```

## 访问地址

- **Web 首页**: http://localhost:3000
- **报告页面**: http://localhost:3000/report/demo
- **API 健康检查**: http://localhost:4000/health
- **API 报告端点**: http://localhost:4000/report/demo
- **Overlay 开发**: http://localhost:5173/postmatch.html

## 测试流程

### 1. 验证 API

```bash
# 健康检查
curl http://localhost:4000/health

# 获取报告
curl http://localhost:4000/report/demo
```

### 2. 验证 Web 页面

1. 打开 http://localhost:3000/report/demo
2. 应该能看到：
   - 报告摘要
   - 视频播放器（需要视频文件在 `/vods/demo.mp4`）
   - 3 条建议卡片
   - 片段列表
3. 点击建议卡片或片段，视频应跳转到对应时间

### 3. 验证 Worker

```bash
# 处理视频（生成假数据）
pnpm --filter worker dev /path/to/video.mp4

# 检查输出
ls tmp/
# 应该看到 {reportId}.json 和 {reportId}-timeline.json
```

### 4. 验证 Overlay

1. 打开 http://localhost:5173/postmatch.html
2. 点击"查看本局报告"按钮，应在新标签打开报告页面
3. 点击"关闭"按钮，应关闭窗口

## 常见问题

### API 无法启动

- 检查端口 4000 是否被占用
- 检查 `packages/schemas` 是否已构建（运行 `pnpm --filter schemas build`）

### Web 页面无法加载报告

- 确认 API 服务器正在运行
- 检查浏览器控制台是否有 CORS 错误
- 确认 `NEXT_PUBLIC_API_URL` 环境变量设置正确

### Worker 报错

- 确认提供了视频路径参数
- 检查 `tmp/` 目录是否有写入权限

### Overlay 无法打开

- 确认 Vite 开发服务器正在运行
- 检查浏览器控制台是否有错误
- 在 Overwolf 环境中，需要正确配置 manifest.json

## 构建生产版本

```bash
# 构建所有包
pnpm build

# 分别构建
pnpm --filter schemas build
pnpm --filter api build
pnpm --filter web build
pnpm --filter overlay build
```

## 环境变量

### API

- `PORT`: API 服务器端口（默认: 4000）

### Web

- `NEXT_PUBLIC_API_URL`: API 服务器地址（默认: http://localhost:4000）

