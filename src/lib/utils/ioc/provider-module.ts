import {ContainerModule} from 'inversify';
import {METADATA_KEY} from './constants';
import type {TProvide} from './types';
import type {interfaces as inversifyInterfaces} from 'inversify';

export function buildProviderModule(): inversifyInterfaces.ContainerModule {
  return new ContainerModule((bind) => {
    const provideMetadata: TProvide[] = Reflect.getMetadata(METADATA_KEY.provide, Reflect) || [];
    provideMetadata.map((metadata) => resolve(metadata, bind));
  });
}

function resolve(metadata: TProvide, bind: inversifyInterfaces.Bind) {
  return metadata.constraint(bind, metadata.implementationType);
}
