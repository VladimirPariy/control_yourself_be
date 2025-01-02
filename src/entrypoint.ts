import 'reflect-metadata';
import type {Application} from 'express';
import {ApplicationType} from '@lib/constants/application';
import {constructIOC} from '@lib/ioc/ioc.builder';
import {createServer} from '@app/server';
import dotenv from 'dotenv';
import {getLogger} from '@lib/utils/logger';

async function boot() {
  dotenv.config({path: process.env.APP_ENV_FILE_PATH || '.env'});

  global.ioc = constructIOC();

  const appType: ApplicationType = process.env.APP_TYPE || ApplicationType.API;
  let _server: Application;

  switch (appType) {
    case ApplicationType.API:
    default:
      _server = await createServer();
  }

  const port = parseInt(process.env.PORT, 10) || 5000;

  _server.listen(port, () => {
    getLogger().info(`Server started on port ${port}`);
  });
}

boot().catch((err) => {
  console.error('[GLOBAL ERROR]', err);
});
