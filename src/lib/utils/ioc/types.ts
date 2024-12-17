/* eslint-disable @typescript-eslint/ban-types */
import {interfaces as inversifyInterfaces} from 'inversify';

export type TProvide = {
  constraint: (bind: inversifyInterfaces.Bind, target: Function) => inversifyInterfaces.BindingInWhenOnSyntax<unknown>;
  implementationType: Function;
};
