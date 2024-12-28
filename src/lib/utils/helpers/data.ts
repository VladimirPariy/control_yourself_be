import dayjs from 'dayjs';
import {prettyLog} from '../logger';

export function mysqlDateFormat(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function blobDateFormat(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS');
}

export function tryParseJSON<T extends object>(input: string): T | null {
  try {
    return JSON.parse(input) as T;
  } catch (e) {
    prettyLog.error('Failed to parse JSON', e);
    return null;
  }
}
