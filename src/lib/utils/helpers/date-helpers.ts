import dayjs from 'dayjs';

export function isOneMinutePassed(timeOfLastAction?: string) {
  if (!timeOfLastAction || !dayjs(timeOfLastAction).isValid()) {
    return false;
  }
  return dayjs().isBefore(dayjs(timeOfLastAction).add(1, 'minute'));
}
