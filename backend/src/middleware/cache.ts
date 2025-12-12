import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

export const CACHE_TTL = {
  DEFAULT: 3600,  // 1 hour
  SHORT: 300,     // 5 minutes
  LONG: 86400,    // 24 hours
};

/**
 * Build a stable Redis cache key:
 * - Prefix
 * - Sorted route params
 * - Sorted query params
 * - Fully deterministic and collision-safe
 */
export const buildCacheKey = (prefix: string, req: Request): string => {
  const parts: string[] = [prefix];

  // Route params
  const params = req.params ?? {};
  const paramEntries = Object.entries(params).sort(([a], [b]) => a.localeCompare(b));
  for (const [k, v] of paramEntries) {
    parts.push(`param:${k}=${v}`);
  }

  // Query params
  const query = req.query ?? {};
  const queryEntries = Object.entries(query).sort(([a], [b]) => a.localeCompare(b));

  if (queryEntries.length > 0) {
    const queryString = queryEntries
      .map(([k, v]) => `q:${k}=${v}`)
      .join("&");

    parts.push(`query?${queryString}`);
  }

  return parts.join("|");
};

/**
 * Generic caching middleware with auto-response wrapping
 */
export const cache = (keyPrefix: string, ttl: number = CACHE_TTL.DEFAULT) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = buildCacheKey(keyPrefix, req);

      const cached = await redis.get(key);
      if (cached) {
        console.log(`[REDIS CACHE HIT] ${key}`);
        return res.json(JSON.parse(cached));
      }

      console.log(`[REDIS CACHE MISS] ${key}`);

      const originalJson = res.json.bind(res);

      res.json = (body: any) => {
        redis
          .setEx(key, ttl, JSON.stringify(body))
          .catch((err) => console.error("Redis caching failed:", err));

        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next();
    }
  };
};

/**
 * Clear product-related caches:
 * - All product list keys (`products*`)
 * - All search keys
 * - Category-specific or ALL category keys
 */
export const clearProductCaches = async (categorySlug?: string) => {
  try {
    const keys: string[] = [];

    const productKeys = await redis.keys("products*");
    const searchKeys = await redis.keys("search*");
    const categoryPattern = categorySlug
      ? `category:${categorySlug}*`
      : "category:*";
    const categoryKeys = await redis.keys(categoryPattern);

    keys.push(...productKeys, ...searchKeys, ...categoryKeys);

    if (keys.length > 0) {
      await redis.del(keys);
      console.log(`Cleared ${keys.length} cache entries.`);
    } else {
      console.log("No caches to clear.");
    }
  } catch (err) {
    console.error("Failed to clear product caches:", err);
  }
};