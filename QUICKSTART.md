# 快速开始

## 🚀 立即运行

```bash
# 1. 安装依赖
pnpm install

# 2. 构建 schemas 包（必须先构建）
pnpm --filter schemas build

# 3. 启动 API（终端 1）
pnpm --filter api dev

# 4. 启动 Web（终端 2）
pnpm --filter web dev
```

## ✅ 验收检查清单

### API 验证
- [ ] `curl http://localhost:4000/health` 返回 `{"ok":true}`
- [ ] `curl http://localhost:4000/report/demo` 返回符合 Report schema 的 JSON

### Web 验证
- [ ] 打开 http://localhost:3000/report/demo
- [ ] 能看到摘要、3条建议卡片、片段列表
- [ ] 点击建议卡片，视频跳转到对应时间（需要视频文件）

### Worker 验证
- [ ] 运行 `pnpm --filter worker dev test.mp4`
- [ ] 在 `tmp/` 目录生成 `{reportId}.json` 和 `{reportId}-timeline.json`

### Overlay 验证
- [ ] 运行 `pnpm --filter overlay dev`
- [ ] 打开 http://localhost:5173/postmatch.html
- [ ] 点击"查看本局报告"按钮能打开报告页面
- [ ] 点击"关闭"按钮能关闭窗口

## 📝 注意事项

1. **视频文件**: Web 页面需要视频文件在 `/vods/demo.mp4`（或修改代码中的路径）
2. **端口冲突**: 确保 3000、4000、5173 端口未被占用
3. **TypeScript**: 所有代码使用严格模式，确保类型安全
4. **合规**: Overlay 不覆盖 HUD，可关闭，默认不常驻

## 🔧 故障排除

- **依赖安装失败**: 确保使用 pnpm 8+
- **类型错误**: 先运行 `pnpm --filter schemas build`
- **API 无法连接**: 检查 CORS 设置和端口占用
- **视频无法播放**: 检查视频文件路径和格式

更多详情请查看 [docs/RUN_GUIDE.md](docs/RUN_GUIDE.md)

