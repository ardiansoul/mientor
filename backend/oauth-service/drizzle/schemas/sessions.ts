import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { baseSoftDelete, baseTimestamps } from "./helper";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  userId: uuid("user_id").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ...baseTimestamps,
  ...baseSoftDelete,
});
