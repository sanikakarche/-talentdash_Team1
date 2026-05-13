import { Ratelimit } from "@upstash/ratelimit";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const publicRateLimit =
  new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(
      100,
      "1 m",
    ),

    analytics: true,

    prefix: "talentdash-public",
  });

export const authenticatedRateLimit =
  new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(
      500,
      "1 m",
    ),

    analytics: true,

    prefix: "talentdash-authenticated",
  });

export const adminRateLimit =
  new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(
      100000,
      "1 m",
    ),

    analytics: true,

    prefix: "talentdash-admin",
  });