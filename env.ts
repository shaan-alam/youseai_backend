import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  MONGO_URI: z.string(),
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit(1);
}

export default parsed.data;
