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


//we use a try-catch block anywhere becuase if an error occurs in try block, it automatically goes to the catch block, 
// else we would have to write it line by or after each line check if there's and error.