import { Redis } from "@upstash/redis";
export declare const redis: Redis;
export declare function cacheGet<T>(key: string): Promise<T | null>;
export declare function cacheSet(key: string, value: unknown, ttlSeconds?: number): Promise<unknown>;
export declare function cacheDelete(key: string): Promise<number>;
export declare function invalidateKeys(keys: string[]): Promise<number | undefined>;
//# sourceMappingURL=cache.d.ts.map