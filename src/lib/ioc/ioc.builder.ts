import {Container} from 'inversify';
import buildProviderModule from '@lib/utils/ioc/provider-module.js';

export function constructIOC(): Container {
  const ioc = new Container();

  // ioc
  //   .bind(Redis)
  //   .toDynamicValue(() => redisClient)
  //   .inSingletonScope();

  // ioc.bind(WorkerBus).toSelf();
  // ioc.bind<QueueFactoryType>(TYPES.QueueFactory).toFactory(queueFactory)

  ioc.load(buildProviderModule());
  return ioc;
}
