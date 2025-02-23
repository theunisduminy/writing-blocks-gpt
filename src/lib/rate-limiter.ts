interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export class RateLimiter {
  private requests: Map<string, number[]>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(config: RateLimitConfig) {
    this.requests = new Map();
    this.windowMs = config.windowMs;
    this.maxRequests = config.maxRequests;
  }

  isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(ip) || [];

    // Remove timestamps outside the current window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.windowMs,
    );

    if (validTimestamps.length >= this.maxRequests) {
      return true;
    }

    // Add current timestamp and update the map
    validTimestamps.push(now);
    this.requests.set(ip, validTimestamps);
    return false;
  }

  getRemainingRequests(ip: string): number {
    const now = Date.now();
    const timestamps = this.requests.get(ip) || [];
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.windowMs,
    );
    return Math.max(0, this.maxRequests - validTimestamps.length);
  }

  getResetTime(ip: string): number {
    const now = Date.now();
    const timestamps = this.requests.get(ip) || [];
    if (timestamps.length === 0) {
      return 0;
    }
    const oldestTimestamp = Math.min(...timestamps);
    return Math.max(0, this.windowMs - (now - oldestTimestamp));
  }
}

// Create a singleton instance for the API
export const rateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 10 requests per minute
});
