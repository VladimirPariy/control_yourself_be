import type {NextFunction, Request, Response} from 'express';
import {generateTraceID} from '@lib/utils/errors';

export function injectTraceID() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.traceID = generateTraceID();
    next();
  };
}
