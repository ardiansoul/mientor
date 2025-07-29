import { z } from "zod";

const registerSchema = z.object({
  provider: z.enum(["google", "local"]),
  providerId: z.string().optional(),
  email: z.string().email(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  avatarUrl: z.string().url().optional(),
});

export type registerDto = z.infer<typeof registerSchema>;
