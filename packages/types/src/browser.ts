export interface BrowserOptionsFieldsType {
  dsn: string;
  makeRequest: () => PromiseLike<unknown>;
}

export abstract class BrowserClientType {
  public abstract getOptions(): Record<string, unknown>;
}

export type LogLevel = 'info' | 'error' | 'warn';

export interface LogTypes {
  name?: string;
  message?: number | string | object;
  tag?: number | string | object;
  type?: string;
  level?: LogLevel;
  ex?: Error | any;
}
