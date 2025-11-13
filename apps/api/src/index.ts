import Fastify from "fastify";
import { Report, ReportSchema } from "@hero-coaches/schemas";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// 假数据（符合 Report schema）
const mockReport: Report = {
  reportId: "demo",
  video: {
    url: "/vods/demo.mp4",
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

// GET /health
fastify.get("/health", async (request, reply) => {
  fastify.log.info("Health check requested");
  return { ok: true };
});

// GET /report/:id
fastify.get<{ Params: { id: string } }>("/report/:id", async (request, reply) => {
  const { id } = request.params;
  fastify.log.info({ reportId: id }, "Report requested");

  // 使用 Zod 校验假数据
  const validated = ReportSchema.parse(mockReport);

  return validated;
});

// 错误处理
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error({ error }, "Request error");
  reply.status(500).send({
    error: {
      code: "INTERNAL_ERROR",
      message: error.message || "Internal server error",
    },
  });
});

// 启动服务器
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 4000;
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info({ port }, "API server started");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

