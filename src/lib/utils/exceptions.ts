import {HttpError} from '@lib/errors/http-error';

import {UnauthorizedError} from 'express-jwt';
// import {ValidationError} from 'yup';

type ExceptionDetails = {
  httpStatus: number;
  safeMessage: string;
  originalMessage: string;
  stack: string | undefined;
  handled: boolean;
  additionalInfo: object | null;
  originalError: Error;
};

export function extractErrorDetails(error: Error): ExceptionDetails {
  let status = 500;
  let message = 'Something went wrong';
  let handled = false;
  let additionalInfo = null;
  if (error instanceof HttpError) {
    status = error.getStatus();
    message = error.message;
    handled = true;
    additionalInfo = {
      ...error.getInternalPayload(),
      original: error.getOriginalError(),
    };
  }
  // else if (error instanceof ValidationError) {
  //   status = 400;
  //   message = error.message;
  //   handled = true;
  // }
  else if (error instanceof UnauthorizedError) {
    status = 401;
    message = error.message;
    handled = true;
  }

  return {
    additionalInfo,
    handled,
    httpStatus: status,
    originalError: error,
    originalMessage: error.message || message,
    safeMessage: message,
    stack: error.stack,
  };
}
