import dotenv from 'dotenv';
import 'reflect-metadata';
import {Application} from 'express';
import {getLogger} from '@lib/utils/logger';
import {constructIOC} from '@lib/ioc/ioc.builder';
import {ApplicationType} from '@lib/constants/application';
import {createServer} from '@app/server';

async function boot() {
  dotenv.config({path: process.env.APP_ENV_FILE_PATH || '.env'});

  const ioc = (global.ioc = constructIOC());

  const appType: ApplicationType = process.env.APP_TYPE || ApplicationType.API;
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
