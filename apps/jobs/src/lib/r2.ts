import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { createLogger } from "./logger.js";
import { getEnv } from "./env.js";
import { gzipSync } from "node:zlib";

const logger = createLogger("talentdash-jobs", { component: "r2" });

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) return client;

  const env = getEnv();

  if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_R2_ACCESS_KEY_ID || !env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
    throw new Error("R2 credentials not configured");
  }

  client = new S3Client({
    region: "auto",
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
  });

  return client;
}

function inferContentType(key: string): string {
  if (key.endsWith(".json")) return "application/json";
  if (key.endsWith(".xml")) return "application/xml";
  if (key.endsWith(".xml.gz")) return "application/gzip";
  if (key.endsWith(".html")) return "text/html";
  if (key.endsWith(".txt")) return "text/plain";
  return "application/octet-stream";
}

export async function uploadToR2(
  key: string,
  body: string | Buffer,
  options?: { contentType?: string; compress?: boolean; metadata?: Record<string, string> },
): Promise<void> {
  const env = getEnv();
  const s3 = getClient();

  let finalBody: string | Buffer | Uint8Array = body;
  let contentType = options?.contentType ?? inferContentType(key);
  let contentEncoding: string | undefined;

  if (options?.compress && typeof body === "string") {
    finalBody = gzipSync(Buffer.from(body, "utf-8"));
    contentEncoding = "gzip";
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_R2_BUCKET,
      Key: key,
      Body: finalBody,
      ContentType: contentType,
      ContentEncoding: contentEncoding,
      Metadata: options?.metadata,
    }),
  );

  logger.info("Uploaded to R2", { key, size: typeof finalBody === "string" ? finalBody.length : (finalBody as Buffer).length });
}

export async function uploadJsonToR2(
  key: string,
  payload: unknown,
  options?: { metadata?: Record<string, string>; compress?: boolean },
): Promise<void> {
  await uploadToR2(key, JSON.stringify(payload), {
    contentType: "application/json",
    compress: options?.compress ?? true,
    metadata: {
      "payload-version": "1",
      ...options?.metadata,
    },
  });
}

export async function downloadFromR2(key: string): Promise<string> {
  const env = getEnv();
  const s3 = getClient();

  const result = await s3.send(
    new GetObjectCommand({ Bucket: env.CLOUDFLARE_R2_BUCKET, Key: key }),
  );

  if (!result.Body) throw new Error(`Empty response for R2 key: ${key}`);
  return result.Body.transformToString("utf-8");
}

export async function deleteFromR2(key: string): Promise<void> {
  const env = getEnv();
  const s3 = getClient();
  await s3.send(new DeleteObjectCommand({ Bucket: env.CLOUDFLARE_R2_BUCKET, Key: key }));
  logger.info("Deleted from R2", { key });
}

export async function listR2Objects(prefix: string): Promise<string[]> {
  const env = getEnv();
  const s3 = getClient();
  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const result = await s3.send(
      new ListObjectsV2Command({
        Bucket: env.CLOUDFLARE_R2_BUCKET,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    if (result.Contents) {
      keys.push(...result.Contents.map((obj) => obj.Key!).filter(Boolean));
    }

    continuationToken = result.NextContinuationToken;
  } while (continuationToken);

  return keys;
}

export function generateVersionedKey(prefix: string, extension: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${prefix}/${timestamp}.${extension}`;
}
