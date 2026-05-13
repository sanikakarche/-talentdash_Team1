import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  DATABASE_URL: z.string().min(1),

  UPSTASH_REDIS_REST_URL: z.string().min(1),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),

  ANTHROPIC_API_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),

  CLOUDFLARE_DEPLOY_HOOK_URL: z.string().url(),

  CRON_SECRET: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid jobs environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );

  throw new Error(
    "Missing or invalid environment variables for @talentdash/jobs",
  );
}

export const env = parsedEnv.data;

export type Env = typeof env;

export function getEnv<K extends keyof Env>(key: K): Env[K] {
  return env[key];
}