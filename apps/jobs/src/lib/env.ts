import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug"])
    .default("info"),

  PORT: z.coerce.number().default(3001),

  DATABASE_URL: z.string().min(1),

  REDIS_URL: z.string().min(1),

  BULLMQ_PREFIX: z.string().default("talentdash"),

  REDIS_CONNECTION_NAME: z.string().default("talentdash-jobs"),

  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),

  CLOUDFLARE_R2_BUCKET: z.string().min(1),

  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().optional(),

  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().optional(),

  CLOUDFLARE_DEPLOY_HOOK_URL: z.string().url().optional(),

  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  REVALIDATION_SECRET: z.string().optional(),

  OPENAI_API_KEY: z.string().optional(),

  ANTHROPIC_API_KEY: z.string().optional(),

  GEMINI_API_KEY: z.string().optional(),

  CRON_SECRET: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const errors = parsed.error.issues
      .map((issue) => {
        const path = issue.path.join(".");
        return `• ${path}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(
      `Environment validation failed:\n${errors}\n\nEnsure all required variables are set in .env or environment.`,
    );
  }

  cachedEnv = parsed.data;

  return cachedEnv;
}