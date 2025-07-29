import { jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseSoftDelete, baseTimestamps } from "./helper";

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: varchar("description", { length: 255 }).notNull(),
  actions: jsonb("actions"),
  ...baseTimestamps,
  ...baseSoftDelete,
});
