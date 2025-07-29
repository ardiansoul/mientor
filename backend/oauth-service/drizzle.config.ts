import { defineConfig } from "drizzle-kit";
import configEnv from "./src/config/env-config";

configEnv(); // Load environment variables

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schemas",
  out: "./drizzle/migrations",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgres://user:password@localhost:5432/mydb",
    ssl: false, // Set to true if using SSL
  },
});
