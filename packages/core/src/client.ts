export function makeDsn(dsn: string): string {
  return dsn;
}

export type ClientOptions = {
  dsn: string;
  transport: () => void;
};

export abstract class BaseClient {
  _options: ClientOptions;
  _transport: any;
  _dsn: string;

  constructor(options: ClientOptions) {
    this._options = options;
    if (options.dsn) {
      this._dsn = makeDsn(options.dsn);
      this._transport = options.transport({});
    }
  }

  public abstract captureException(_exception: any, _hint: number): PromiseLike<Event>;
}
