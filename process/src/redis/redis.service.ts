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

  async exists(key: string) {
    return this.redis.exists(key);
  }

  async incr(key: string) {
    return this.redis.incr(key);
  }

  async expire(key: string, seconds: number) {
    return this.redis.expire(key, seconds);
  }

  async hset(hash: string, field: string, value: any) {
    return this.redis.hset(hash, field, JSON.stringify(value));
  }

  async hget(hash: string, field: string) {
    const value = await this.redis.hget(hash, field);
    return value ? JSON.parse(value) : null;
  }

  async hdel(hash: string, field: string) {
    return this.redis.hdel(hash, field);
  }
}
