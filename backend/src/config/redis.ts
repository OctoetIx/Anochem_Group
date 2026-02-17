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

redis.on("connect", () => {
  console.log("Redis connecting...");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});

redis.on("error", (err) => {
  if (err instanceof Error) {
    console.error("Redis error:", err.message);
  } else {
    console.error("Redis error:", err);
  }
});

let isConnected = false;

export async function connectRedis() {
  if (isConnected) return;

  try {
    await redis.connect();
    isConnected = true;
    console.log("Redis connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Redis connection failed:", err.message);
    } else {
      console.error("Redis connection failed:", err);
    }
  }
}

export default redis; 