export class FriendlyError extends Error {
  constructor(message: string) {
    super(message);
  }

  toString() {
    return this.message;
  }

  toSystemString() {}
}
