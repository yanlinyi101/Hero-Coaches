# Changelog

## [M1-E0] - 2024-01-XX

### 新增

#### 项目结构
- 创建 Turborepo monorepo 基础结构
- 配置 pnpm workspace 和 turbo.json
- 建立标准目录结构：apps/ 和 packages/

#### packages/schemas
- 实现 `Report` schema（Zod）
  - `reportId`, `video`, `summary`
  - `suggestions`（固定 3 条）
  - `slices`（至少 3 个）
- 实现 `Timeline` schema（占位）
- 导出 TypeScript 类型

#### apps/api
- Fastify 服务器（端口 4000）
- Pino 日志集成（pino-pretty）
- `GET /health` 端点
- `GET /report/:id` 端点（返回假数据，通过 Zod 校验）
- 统一错误处理（`{ error: { code, message } }`）

#### apps/web
- Next.js 14（App Router）+ TypeScript
- Tailwind CSS + shadcn/ui 组件
- TanStack Query 集成
- 报告页面：`/report/[id]`
  - 视频播放器（内置 `<video>`）
  - 3 条建议卡片（点击跳转视频时间）
  - 片段列表（点击跳转）
  - 时间格式化显示
- 响应式布局

#### apps/worker
- Node.js CLI 工具
- 接收视频路径参数
- 生成假 `report.json` 和 `timeline.json`
- 输出到 `tmp/` 目录
- Pino 日志记录

#### apps/overlay
- Overwolf Overlay 基础结构
- Vite 构建配置
- `postmatch.html` 页面
  - 赛后提醒 UI
  - "查看本局报告" 按钮（打开 http://localhost:3000/report/demo）
  - "关闭" 按钮
- 开发模式支持（无 Overwolf API 时）

#### 基础设施
- `infra/docker-compose.yml`（占位，M1 阶段为空）
- `.gitignore` 配置

### 技术栈

- **包管理**: pnpm 8 + Turborepo
- **Web**: Next.js 14, Tailwind CSS, shadcn/ui, TanStack Query
- **API**: Fastify 4, Pino, Zod
- **Worker**: Node.js, TypeScript
- **Overlay**: Vite, TypeScript, Overwolf Types
- **类型系统**: Zod schemas + TypeScript strict mode

### 合规

- ✅ Overlay 窗口可关闭、可拖动
- ✅ 默认不常驻显示
- ✅ 不覆盖 HUD
- ✅ 不在对局中持续显示
- ✅ 无内存读写、OCR、游戏修改

### 已知限制

- API 仅返回假数据
- Worker 仅生成假数据
- Overlay 需要 Overwolf 环境才能完整运行
- 视频文件需要手动放置到 `/vods/demo.mp4`

### 下一步（M1-E1+）

- [ ] 实现真实视频解析（FFmpeg）
- [ ] 实现真实数据存储（Postgres）
- [ ] 实现文件上传功能
- [ ] 实现队列处理（BullMQ）
- [ ] 完善 Overwolf 事件订阅

