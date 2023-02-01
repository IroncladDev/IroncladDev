import { rateLimit } from "express-rate-limit";

export default function createRateLimit(time: number, max: number) {
  return rateLimit({
    windowMs: time,
    max,
    legacyHeaders: false,
    keyGenerator: (req) => {
      return req.headers["x-forwarded-for"] || req.ip;
    },
    handler: (_, res) => {
      res.status(429).send({
        success: false,
        message: "Too many requests, please try again later",
      });
    },
  });
}
