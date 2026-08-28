import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// .env.local से पर्यावरण चर लोड करें
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in .env.local");
}

export default defineConfig({
    schema: "./src/db/schema/*",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
