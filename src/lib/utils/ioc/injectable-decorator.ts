import {METADATA_KEY as INVERSIFY_METADATA_KEY, decorate, injectable} from 'inversify';
import {METADATA_KEY} from './constants';
import type {TProvide} from './types';
import type {interfaces as inversifyInterfaces} from 'inversify';
import {prettyLog} from '@lib/utils/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function provide(): <T extends abstract new (...args: any) => unknown>(target: T) => T {
  return function (target) {
    const isAlreadyDecorated = Reflect.hasOwnMetadata(INVERSIFY_METADATA_KEY.PARAM_TYPES, target.prototype);
    if (!isAlreadyDecorated) {
      decorate(injectable(), target);
      prettyLog(`[${new Date().toISOString()}] ${target.name} resolved`);
    } else {
      try {
        decorate(injectable(), target);
      } catch (e) {
        prettyLog.error(`[${new Date().toISOString()}] ${e}`);
        throw new Error('Cannot apply @provide decorator multiple times for ' + target.name);
      }
    }

    const currentMetadata: TProvide = {
      constraint: (bind: inversifyInterfaces.Bind) => bind(target).toSelf(),
      implementationType: target,
    };

    const previousMetadata: TProvide[] = Reflect.getMetadata(METADATA_KEY.provide, Reflect) || [];

    const newMetadata = [currentMetadata, ...previousMetadata];

    Reflect.defineMetadata(METADATA_KEY.provide, newMetadata, Reflect);
    return target;
  };
}
