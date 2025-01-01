import {RedisOptions} from 'ioredis';

export function getRedisConnectionOptions(): RedisOptions {
  return {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    db: parseInt(process.env.REDIS_DB, 10) || 0,
    password: process.env.REDIS_PASS || undefined,
  };
}
