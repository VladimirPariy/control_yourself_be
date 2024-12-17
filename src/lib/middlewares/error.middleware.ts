import {NextFunction, Response, Request} from 'express';

import {getLogger} from '@app/lib/utils/logger.js';
import {generateTraceID} from '@lib/utils/errors.js';
import {extractErrorDetails} from '@lib/utils/exceptions.js';

export const errorMiddleware = (err: Error, req: Request, res: Response, _: NextFunction): Response<unknown> => {
  const {handled, stack, additionalInfo, httpStatus, safeMessage, originalMessage} = extractErrorDetails(err);

  const traceID = generateTraceID();
  getLogger().error(originalMessage, {
    stack: handled ? undefined : stack,
    traceID,
    http: {
      url: req.url,
      method: req.method,
    },
    info: {
      ...additionalInfo,
    },
    user: {
      ...req?.user,
    },
  });

  return res.status(httpStatus).send({
    errors: [{safeMessage, traceID}],
  });
};
