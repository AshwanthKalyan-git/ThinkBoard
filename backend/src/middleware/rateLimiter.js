import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip; // Use IP for per-user limiting
    const { success, remaining, reset } = await ratelimit.limit(identifier);

    if (!success) {
      res.set({
        'X-RateLimit-Remaining': remaining,
        'X-RateLimit-Reset': reset
      });
      return res.status(429).json({
        message: "Too many requests, please try again in 20 seconds",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error", error);
    return next(error); // Added return
  }
};

export default rateLimiter;