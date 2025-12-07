import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}
  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: any, ttlSeconds?: number) {
    if (ttlSeconds) {
      return this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }
    return this.redis.set(key, JSON.stringify(value));
  }

  async del(key: string) {
    return this.redis.del(key);
  }
}
