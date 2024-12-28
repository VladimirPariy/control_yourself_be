import cors from 'cors';
import 'express-async-errors';
import {HttpError} from '@app/lib/errors/http-error.js';
import {RootRouter} from '@app/routes/root.router.js';
import {Container} from 'inversify';
import {errorMiddleware} from '@lib/middlewares/error.middleware.js';
import {injectTraceID} from '@lib/middlewares/trace.middleware.js';
import {Application} from 'express';
import express from 'express';

export async function createServer(ioc: Container): Promise<Application> {
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

  app.use(errorMiddleware);

  return app;
}
