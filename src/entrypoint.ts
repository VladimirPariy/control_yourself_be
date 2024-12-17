import dotenv from 'dotenv';
import 'reflect-metadata';
import {Application} from 'express';
import {getLogger} from '@lib/utils/logger.js';
import {constructIOC} from '@lib/ioc/ioc.builder.js';
import {ApplicationType} from '@lib/constants/application.js';
import {createServer} from '@app/server.js';

async function boot() {
  dotenv.config({path: process.env.APP_ENV_FILE_PATH || '.env'});

  const ioc = (global.ioc = constructIOC());

  const appType: ApplicationType = (process.env.APP_TYPE || ApplicationType.API) as ApplicationType;
  let _server: Application;

  switch (appType) {
    case ApplicationType.API:
    default:
      _server = await createServer(ioc);
  }

  const port = parseInt(process.env.PORT, 10) || 5000;

  _server.listen(port, () => {
    getLogger().info(`Server started on port ${port}`);
  });
}

boot().catch((err) => {
  console.error('[GLOBAL ERROR]', err);
});
