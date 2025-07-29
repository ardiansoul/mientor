import { z } from "zod";

const responseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.any().optional(),
});

export type ResponseSchema = z.infer<typeof responseSchema>;

const errorSchema = z.object({
  status: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
