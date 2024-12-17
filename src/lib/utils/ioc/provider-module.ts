import {interfaces as inversifyInterfaces, ContainerModule} from 'inversify';
import {METADATA_KEY} from './constants.js';
import {TProvide} from './types.js';

function buildProviderModule(): inversifyInterfaces.ContainerModule {
  return new ContainerModule((bind) => {
    const provideMetadata: TProvide[] = Reflect.getMetadata(METADATA_KEY.provide, Reflect) || [];
    provideMetadata.map((metadata) => resolve(metadata, bind));
  });
}

function resolve(metadata: TProvide, bind: inversifyInterfaces.Bind) {
  return metadata.constraint(bind, metadata.implementationType);
}
export default buildProviderModule;
