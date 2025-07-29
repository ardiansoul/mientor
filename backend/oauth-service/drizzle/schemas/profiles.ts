import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { baseSoftDelete, baseTimestamps } from "./helper";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  firstName: varchar("first_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  ...baseTimestamps,
  ...baseSoftDelete,
});
