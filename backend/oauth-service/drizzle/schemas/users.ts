import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseSoftDelete, baseTimestamps } from "./helper";
import { roles } from "./roles";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }).unique(),
  password: varchar("password", { length: 255 }),
  provider: varchar("provider", { length: 50, enum: ["local", "google"] })
    .notNull()
    .default("local"),
  providerId: varchar("provider_id", { length: 255 }),
  roleId: uuid("role_id").references(() => roles.id, {
    onDelete: "no action",
    onUpdate: "no action",
  }),
  ...baseTimestamps,
  ...baseSoftDelete,
});
