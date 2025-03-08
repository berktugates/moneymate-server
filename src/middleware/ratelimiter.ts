import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "You have attempted to log in too many times. Please try again in 15 minutes.",
  headers: true,
});
