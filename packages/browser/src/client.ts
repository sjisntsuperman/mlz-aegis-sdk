import { makeFetchTransport } from './transport/fetch';
import { BaseClient, ClientOpt, createTransport } from '@aegis/core';

export class BrowserClient extends BaseClient {
  transport: any;
  _options: ClientOpt;
  constructor(options?: any) {
    super(options);
    this._options = {
      ...options,
    };
    this.transport = createTransport(options, makeFetchTransport);
  }

  // 手动上报
  public log(msg) {
    const error = {
      ...msg,
    };
    this.transport.send(error);
  }
}
