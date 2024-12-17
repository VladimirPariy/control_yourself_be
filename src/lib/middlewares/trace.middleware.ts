import {generateTraceID} from '@lib/utils/errors.js';
import {NextFunction, Response, Request} from 'express';

export function injectTraceID() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.traceID = generateTraceID();
    next();
  };
}
