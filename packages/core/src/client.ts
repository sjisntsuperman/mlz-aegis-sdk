export type ClientOptions = {
  dsn: string;
  transport: () => void;
};

export abstract class BaseClient {
  public _options: ClientOptions;
  public _transport: unknown = null;
  public _dsn = '';

  constructor(options: ClientOptions) {
    this._options = options;
    if (options.dsn) {
      this._dsn = options.dsn;
    }
  }

  public abstract captureException(): void;
}
