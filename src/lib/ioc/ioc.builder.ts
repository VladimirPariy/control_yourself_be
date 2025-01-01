import {Container} from 'inversify';
import {Redis} from 'ioredis';
import {getRedisConnectionOptions} from '@lib/db/redis.client';
import {buildProviderModule} from '@lib/utils/ioc/provider-module';
import {PrismaClient} from '@prisma/client';
import {initPrismaClient} from '@lib/db/prisma.client';

export function constructIOC(): Container {
  const ioc = new Container();

  const redisClient = new Redis(getRedisConnectionOptions());

  ioc
    .bind(Redis)
    .toDynamicValue(() => redisClient)
    .inSingletonScope();
  ioc
    .bind(PrismaClient)
    .toDynamicValue(() => initPrismaClient())
    .inSingletonScope();

  // ioc.bind(WorkerBus).toSelf();
  // ioc.bind<QueueFactoryType>(TYPES.QueueFactory).toFactory(queueFactory)

  ioc.load(buildProviderModule());
  return ioc;
}
