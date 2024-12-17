import {ApplicationType} from '@lib/constants/application.js';
import chalk from 'chalk';
import winston from 'winston';

let __logger: winston.Logger;

const errorLogsConfig = {filename: 'errors.log', level: 'error', dirname: 'logs'};
const infoLogsConfig = {filename: 'information.log', level: 'info', dirname: 'logs'};
const warnLogsConfig = {filename: 'warnings.log', level: 'warn', dirname: 'logs'};

export function getLogger(): winston.Logger {
  if (!__logger) {
    const meta: {
      service: string;
      kind: string;
      queue?: string;
    } = {
      service: 'evrythink',
      kind: process.env.APP_TYPE || ApplicationType.API,
    };

    if (process.env.QUEUE_NAME) {
      meta.queue = process.env.QUEUE_NAME;
    }

    __logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      defaultMeta: meta,
      transports: [
        new winston.transports.Console(),
        new winston.transports.File(infoLogsConfig),
        new winston.transports.File(errorLogsConfig),
        new winston.transports.File(warnLogsConfig),
      ],
    });
  }
  return __logger;
}

export function prettyLog(prefix: string, ...args: unknown[]) {
  console.log.apply(console.log, [chalk.green(prefix), ...args]);
}

prettyLog.debug = function (prefix: string, ...args: unknown[]) {
  if (process.env.LOG_LEVEL === 'debug') {
    console.log.apply(console.log, [chalk.yellow(prefix), ...args]);
  }
};

prettyLog.info = function (prefix: string, ...args: unknown[]) {
  console.log.apply(console.log, [chalk.bgCyan(prefix), ...args]);
};

prettyLog.warn = function (prefix: string, ...args: unknown[]) {
  console.log.apply(console.log, [chalk.yellow(prefix), ...args]);
};

prettyLog.error = function (prefix: string, ...args: unknown[]) {
  console.log.apply(console.log, [chalk.red(prefix), ...args]);
};
