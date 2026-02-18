import { createClient } from "redis";

const redisUrl = `redis://${process.env.REDIS_USERNAME || "default"}:${
  process.env.REDIS_PASSWORD
}@${process.env.REDIS_HOST || "redis"}:${process.env.REDIS_PORT || 6379}`;

const redis = createClient({
  url: redisUrl,
  socket: {
    connectTimeout: 5000,
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        return new Error("Redis retry limit reached");
      }
      return Math.min(retries * 500, 3000);
    },
  },
});

// ---------------- Events ----------------

redis.on("connect", () => {
  console.log("Redis connecting...");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});

redis.on("end", () => {
  console.log("Redis connection closed");
});

redis.on("error", (err) => {
  console.error("Redis error:", err instanceof Error ? err.message : err);
});

// ---------------- Connect Function ----------------

export async function connectRedis() {
  if (redis.isOpen) {
    console.log("Redis already connected");
    return;
  }

  try {
    await redis.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error(
      "Redis connection failed:",
      err instanceof Error ? err.message : err
    );
  }
}

export default redis;