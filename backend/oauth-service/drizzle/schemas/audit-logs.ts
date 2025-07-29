import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "no action",
    onUpdate: "no action",
  }),
  event: varchar("event", { length: 255 }).notNull(),
  details: varchar("details", { length: 1024 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: varchar("user_agent", { length: 512 }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
});
