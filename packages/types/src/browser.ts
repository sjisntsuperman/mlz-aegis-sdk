import { TransportMakeRequestResponse } from '.';
import { EnvelopeItem } from './envelope';

export interface BrowserOptionsFieldsType {
  dsn: string;
  makeRequest?: (envelope: EnvelopeItem) => PromiseLike<TransportMakeRequestResponse>;
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
