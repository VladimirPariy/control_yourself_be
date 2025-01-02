import type {NextFunction, Request, Response} from 'express';
import {extractErrorDetails} from '@lib/utils/exceptions';
import {generateTraceID} from '@lib/utils/errors';
import {getLogger} from '@app/lib/utils/logger';

export const errorMiddleware = (err: Error, req: Request, res: Response, _: NextFunction): Response<unknown> => {
  const {handled, stack, additionalInfo, httpStatus, safeMessage, originalMessage} = extractErrorDetails(err);

  const traceID = generateTraceID();
  getLogger().error(originalMessage, {
    http: {
      method: req.method,
      url: req.url,
    },
    info: {
      ...additionalInfo,
    },
    stack: handled ? undefined : stack,
    traceID,
    user: {
      ...req?.user,
    },
  });

  return res.status(httpStatus).send({
    errors: [{safeMessage, traceID}],
  });
};
