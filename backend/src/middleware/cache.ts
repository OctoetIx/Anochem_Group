import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

export const CACHE_TTL = {
  DEFAULT: 3600,
  SHORT: 300,
  LONG: 86400,
};

export const cache = (keyPrefix: string, ttl = CACHE_TTL.DEFAULT) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let key = keyPrefix;

      if (req.params.category) key += `:${req.params.category}`;
      if (req.params.term) key += `:${req.params.term}`;
      if (req.query.page) key += `:${req.query.page}`;
      if (req.query.limit) key += `:${req.query.limit}`;
      if (req.query.sort) key += `:${req.query.sort}`;
      if (req.query.order) key += `:${req.query.order}`;

      const cachedData = await redis.get(key);
      if (cachedData) {
        console.log(`[REDIS CACHE HIT] Key: ${key}`); // log hit
        return res.json(JSON.parse(cachedData));
      } else {
        console.log(`[REDIS CACHE MISS] Key: ${key}`); // log miss
      }

      const originalJson = res.json.bind(res);
      res.json = (body: any) => {
        redis
          .setEx(key, ttl, JSON.stringify(body))
          .catch((err) => console.error("Redis caching failed:", err));
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Redis cache middleware error:", err);
      next();
    }
  };
};

export const clearProductCaches = async (category?: string) => {
  try {
    await redis.del("products");
    if (category) await redis.del(`category:${category}`);
    const searchKeys = await redis.keys("search:*");
    if (searchKeys.length) await redis.del(searchKeys);
  } catch (err) {
    console.error("Failed to clear product caches:", err);
  }
};