import {Container, interfaces} from 'inversify';

export function bindServicesToIoc(container: Container, services: interfaces.ServiceIdentifier<unknown>[]) {
  services.forEach((entity) => {
    container.bind(entity).toSelf();
  });
}
