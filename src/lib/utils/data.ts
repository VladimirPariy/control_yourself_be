import dayjs from 'dayjs';

export function mysqlDateFormat(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function blobDateFormat(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS');
}

export function tryParseJSON<T extends object>(input: string): T | null {
  try {
    return JSON.parse(input) as T;
  } catch (err) {
    return null;
  }
}
