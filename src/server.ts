import '../instrument.js';
import 'express-async-errors';
import * as Sentry from '@sentry/node';
import type {Application} from 'express';
import {HttpError} from '@app/lib/errors/http-error';
import {RootRouter} from '@app/routes/root.router';
import cors from 'cors';
import {errorMiddleware} from '@lib/middlewares/error.middleware';
import express from 'express';
import {injectTraceID} from '@lib/middlewares/trace.middleware';

export async function createServer(): Promise<Application> {
  const app = express();

  app.use(
    cors({
      origin: function (origin, callback) {
        if (origin && /localhost/.test(origin)) {
          callback(null, origin);
        } else {
          callback(null, false);
        }
      },
    })
  );

  app.use(
    express.json({
      limit: '20mb',
      verify: (req, _, buf) => {
        if (req.url?.startsWith('/api/stripe/webhook')) {
          req.rawBody = buf.toString();
        }
      },
    })
  );

  app.use(injectTraceID());

  app.get('/api/health', async (_, res) => {
    res.json({message: 'OK'});
  });

  const rootRouter = ioc.get(RootRouter);
  app.use('/api', rootRouter.execute());

  app.all('**', (req) => {
    throw new HttpError(404, `[control_yourself] Route is not found`, {
      path: req.path,
    });
  });

  Sentry.setupExpressErrorHandler(app);

  app.use(errorMiddleware);

  return app;
}
