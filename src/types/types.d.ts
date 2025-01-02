import type {Container} from 'inversify';

declare global {
  type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
  };

  type Nullable<T> = T | null;
  type NonNullable<T> = T extends null | undefined ? never : T;

  type NumberORString = number | string;

  type StringORDate = string | Date | null;

  type OmitTyped<Obj extends object, Keys extends keyof Obj> = Omit<Obj, Keys>;

  type TFiles = {
    [fieldname: string]: Express.Multer.File[];
  };

  export type PartialRecord<K extends keyof unknown, T> = {
    [P in K]?: T;
  };
}

declare global {
  // eslint-disable-next-line no-var
  var ioc: Container;
  namespace Express {
    export interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user?: any;
      traceID?: string;
    }
  }
}

declare module 'http' {
  interface IncomingMessage {
    rawBody: Buffer | string;
  }
}

export {};
