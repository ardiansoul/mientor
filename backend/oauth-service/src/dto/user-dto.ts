import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type UserDto = z.infer<typeof userSchema>;
