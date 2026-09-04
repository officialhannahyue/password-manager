import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export const signupRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    prefix: "ratelimit:signup",
})

export const loginRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    prefix: "ratelimit:login",
})

export const demoLoginRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "ratelimit:demo-login",
})

export const revealPasswordRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "ratelimit:reveal",
})