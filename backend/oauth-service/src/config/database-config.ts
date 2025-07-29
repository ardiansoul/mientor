import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(connection, {
  logger: true, // Enable logging for debugging
});
