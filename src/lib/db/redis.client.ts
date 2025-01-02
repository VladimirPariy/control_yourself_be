import type {RedisOptions} from 'ioredis';

export function getRedisConnectionOptions(): RedisOptions {
  return {
    db: parseInt(process.env.REDIS_DB, 10) || 0,
    enableReadyCheck: false,
    host: process.env.REDIS_HOST,
    maxRetriesPerRequest: null,
    password: process.env.REDIS_PASS || undefined,
    port: parseInt(process.env.REDIS_PORT, 10) || undefined,
  };
}
