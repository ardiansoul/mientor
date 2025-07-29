import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.string(),
});

export type UserDto = z.infer<typeof userSchema>;
