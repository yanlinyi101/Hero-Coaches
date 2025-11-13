import { z } from "zod";

export const Timeline = z.object({
  timelineId: z.string(),
  events: z.array(
    z.object({
      timestamp: z.number(),
      type: z.string(),
      data: z.record(z.unknown()),
    })
  ),
});

export type Timeline = z.infer<typeof Timeline>;

