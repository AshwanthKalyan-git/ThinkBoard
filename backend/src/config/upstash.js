import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from 'dotenv';

dotenv.config();

let ratelimit;
try {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
  });
  console.log("Upstash Redis connected successfully");
} catch (err) {
  console.error("Failed to initialize Upstash:", err);
  process.exit(1); // Crash app if Redis fails
}

export default ratelimit;