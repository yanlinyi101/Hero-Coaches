import { z } from "zod";

export const Slice = z.object({
  start: z.number(),
  end: z.number(),
  why: z.string(),
});

export const Suggestion = z.object({
  id: z.string(),
  title: z.string(),
  slice: z.object({
    start: z.number(),
    end: z.number(),
  }),
});

export const ReportSchema = z.object({
  reportId: z.string(),
  video: z.object({
    url: z.string(),
    duration: z.number(),
  }),
  summary: z.string(),
  suggestions: z.array(Suggestion).length(3),
  slices: z.array(Slice).min(3),
});

export type Report = z.infer<typeof ReportSchema>;
export type Suggestion = z.infer<typeof Suggestion>;
export type Slice = z.infer<typeof Slice>;

