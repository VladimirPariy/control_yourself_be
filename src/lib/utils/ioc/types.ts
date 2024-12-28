/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {interfaces as inversifyInterfaces} from 'inversify';

export type TProvide = {
  constraint: (bind: inversifyInterfaces.Bind, target: Function) => inversifyInterfaces.BindingInWhenOnSyntax<unknown>;
  implementationType: Function;
};
