export class HttpError extends Error {
  constructor(
    private _status: number,
    private _message: string,
    private readonly internalPayload?: object,
    private readonly originalError?: Error
  ) {
    super(_message);
  }

  getStatus(): number {
    return this._status;
  }

  getInternalPayload(): object | undefined {
    return this.internalPayload;
  }

  getOriginalError(): Error | undefined {
    return this.originalError;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }
}
