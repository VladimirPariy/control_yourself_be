import {Command} from 'commander';
import dotenv from 'dotenv';

async function boot() {
  dotenv.config({path: process.env.APP_ENV_FILE_PATH || '.env'});

  const program = new Command();
  program.name('EVRYTHINK').description('CLI for EVRYTHINK');

  await program.parseAsync();
  process.exit(0);
}

boot().catch(console.error);
