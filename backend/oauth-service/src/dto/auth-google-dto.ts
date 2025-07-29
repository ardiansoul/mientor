import { z } from "zod";

export const googleAuthSchema = z
  .object({
    provider: z.literal("google"),
    id: z.string(),
    emails: z.array(z.object({ value: z.string().email() })),
    name: z.object({
      givenName: z.string().min(1).max(50),
      familyName: z.string().min(1).max(50),
    }),
    photos: z.array(
      z.object({
        value: z.string().url(),
      })
    ),
  })
  .transform((data) => {
    return {
      provider: data.provider,
      providerId: data.id,
      email: data.emails[0].value || "",
      firstName: data.name.givenName,
      lastName: data.name.familyName,
      avatarUrl: data.photos[0]?.value || "",
    };
  });

export type googleAuthDto = z.infer<typeof googleAuthSchema>;
