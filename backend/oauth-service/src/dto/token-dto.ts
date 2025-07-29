import { z } from "zod";

export const tokenSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string().email(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.string(),
  isActive: z.string(),
});

export type tokenDto = z.infer<typeof tokenSchema>;
