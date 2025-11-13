# Hero Coaches

游戏复盘分析系统 - MVP 闭环（M1-E0）

## 项目结构

```
Hero Coaches/
├── apps/
│   ├── api/        # Fastify API 服务器
│   ├── web/         # Next.js 报告与上传向导
│   ├── worker/      # 视频解析 Worker
│   └── overlay/     # Overwolf 赛后提醒
├── packages/
│   └── schemas/     # Zod 数据契约（Report/Timeline）
├── infra/
│   └── docker-compose.yml
└── docs/
    └── CHANGELOG.md
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动所有服务
pnpm dev

# 或分别启动
pnpm --filter api dev      # API (端口 4000)
pnpm --filter web dev      # Web (端口 3000)
pnpm --filter worker dev   # Worker (CLI)
pnpm --filter overlay dev  # Overlay (端口 5173)
```

### 构建

```bash
pnpm build
```

## API 端点

- `GET /health` - 健康检查
- `GET /report/:id` - 获取报告（当前返回假数据）

## Web 页面

- `/` - 首页
- `/report/[id]` - 报告详情页（示例：`/report/demo`）

## Worker 使用

```bash
# 处理视频（生成假数据）
pnpm --filter worker dev <video-path>
```

输出文件：
- `tmp/{reportId}.json` - 报告数据
- `tmp/{reportId}-timeline.json` - 时间线数据

## Overlay

Overwolf Overlay 应用，赛后弹出提醒窗口。

开发模式：直接打开 `apps/overlay/src/postmatch.html` 在浏览器中测试。

## 技术栈

- **包管理**: pnpm + Turborepo
- **Web**: Next.js 14, Tailwind CSS, shadcn/ui, TanStack Query
- **API**: Fastify, Pino, Zod
- **Worker**: Node.js, TypeScript
- **Overlay**: Vite, TypeScript, Overwolf

## 合规说明

- ✅ 不读取游戏内存
- ✅ 不使用 OCR
- ✅ 不修改游戏文件
- ✅ Overlay 不覆盖 HUD
- ✅ Overlay 可关闭、默认不常驻

## 许可证

私有项目

