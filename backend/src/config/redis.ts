import { createClient } from "redis";

const redisUrl = `redis://${process.env.REDIS_USERNAME || 'default'}:${
  process.env.REDIS_PASSWORD
}@${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`;

const redis = createClient({ url: redisUrl });

redis.on("error", (err) => console.error("Redis Client Error", err));

export async function connectRedis() {
  await redis.connect();
  console.log("Redis connected");
}

export default redis;