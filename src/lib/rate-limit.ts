/**
 * Simple Token-Bucket Rate Limiter for Next.js Route Handlers.
 * In production environments, this would be replaced with a Redis-backed store
 * to support multi-instance distributed server architectures.
 */

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

const memoryStore = new Map<string, TokenBucket>();

export interface RateLimitOptions {
  limit: number;      // Maximum capacity of the bucket
  interval: number;   // Refill interval in milliseconds
}

export function rateLimit(
  ip: string,
  options: RateLimitOptions = { limit: 10, interval: 60000 } // Default: 10 requests per minute
): { success: boolean; limit: number; remaining: number } {
  const { limit, interval } = options;
  const now = Date.now();

  let bucket = memoryStore.get(ip);

  if (!bucket) {
    bucket = { tokens: limit, lastRefill: now };
    memoryStore.set(ip, bucket);
  } else {
    const elapsed = now - bucket.lastRefill;
    // Calculate how many tokens to refill
    const refillAmount = Math.floor((elapsed / interval) * limit);

    if (refillAmount > 0) {
      bucket.tokens = Math.min(limit, bucket.tokens + refillAmount);
      bucket.lastRefill = now;
    }
  }

  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    return { success: true, limit, remaining: bucket.tokens };
  }

  return { success: false, limit, remaining: 0 };
}
