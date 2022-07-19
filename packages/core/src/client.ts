export function getCurrentHub() {}

class BaseClient {
  constructor(options) {}

  public abstract captureException(_exception: any, _hint: number): PromiseLike<Event>;
}
