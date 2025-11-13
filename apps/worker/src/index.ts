import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import pino from "pino";
import { Report, ReportSchema } from "@hero-coaches/schemas";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
});

// 假数据（符合 Report schema）
function generateMockReport(videoPath: string): Report {
  return {
    reportId: `report-${Date.now()}`,
    video: {
      url: videoPath,
      duration: 600,
    },
    summary: "示例：集合度不足、资源交换不充分、死亡过密。",
    suggestions: [
      {
        id: "S1",
        title: "大招前打信号，双核开招",
        slice: { start: 120, end: 135 },
      },
      {
        id: "S2",
        title: "团战前30s集合高地拐角",
        slice: { start: 300, end: 315 },
      },
      {
        id: "S3",
        title: "被击杀后等队友复活同进",
        slice: { start: 420, end: 435 },
      },
    ],
    slices: [
      { start: 120, end: 135, why: "单核开大未形成资源交换" },
      { start: 300, end: 315, why: "集合度不足导致被逐个击破" },
      { start: 420, end: 435, why: "复活节奏不同步" },
    ],
  };
}

async function processVideo(videoPath: string) {
  logger.info({ videoPath }, "开始处理视频");

  // 生成假数据
  const report = generateMockReport(videoPath);

  // 使用 Zod 校验
  const validated = ReportSchema.parse(report);
  logger.info({ reportId: validated.reportId }, "报告数据校验通过");

  // 确保 tmp 目录存在
  const tmpDir = join(process.cwd(), "tmp");
  mkdirSync(tmpDir, { recursive: true });

  // 输出 report.json
  const reportPath = join(tmpDir, `${validated.reportId}.json`);
  writeFileSync(reportPath, JSON.stringify(validated, null, 2), "utf-8");
  logger.info({ reportPath }, "报告已保存");

  // 输出 timeline.json（占位）
  const timeline = {
    timelineId: validated.reportId,
    events: [
      { timestamp: 120, type: "suggestion", data: { id: "S1" } },
      { timestamp: 300, type: "suggestion", data: { id: "S2" } },
      { timestamp: 420, type: "suggestion", data: { id: "S3" } },
    ],
  };
  const timelinePath = join(tmpDir, `${validated.reportId}-timeline.json`);
  writeFileSync(timelinePath, JSON.stringify(timeline, null, 2), "utf-8");
  logger.info({ timelinePath }, "时间线已保存");

  return validated;
}

// CLI 入口
const videoPath = process.argv[2];
if (!videoPath) {
  logger.error("请提供视频路径作为参数");
  logger.info("用法: pnpm dev <video-path>");
  process.exit(1);
}

processVideo(videoPath)
  .then((report) => {
    logger.info({ reportId: report.reportId }, "处理完成");
    process.exit(0);
  })
  .catch((error) => {
    logger.error({ error }, "处理失败");
    process.exit(1);
  });

