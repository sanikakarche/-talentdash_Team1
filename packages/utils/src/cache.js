import { Redis } from "@upstash/redis";
export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export async function cacheGet(key) {
    return redis.get(key);
}
export async function cacheSet(key, value, ttlSeconds) {
    if (ttlSeconds) {
        return redis.set(key, value, {
            ex: ttlSeconds,
        });
    }
    return redis.set(key, value);
}
export async function cacheDelete(key) {
    return redis.del(key);
}
export async function invalidateKeys(keys) {
    if (!keys.length)
        return;
    return redis.del(...keys);
}
//# sourceMappingURL=cache.js.map