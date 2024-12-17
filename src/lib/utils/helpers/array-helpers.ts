export function toUniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
