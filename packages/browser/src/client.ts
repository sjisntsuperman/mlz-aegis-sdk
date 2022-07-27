import { createTransport } from '@aegis-web-sdk/core';
import { makeFetchTransport } from './transport/fetch';
import { getCurrentHub, BaseClient, ClientOpt } from '@aegis-web-sdk/core';
import { logger } from '@aegis-web-sdk/utils';

export class BrowserClient extends BaseClient {
  transport: any;
  _options: ClientOpt;
  constructor(options) {
    super(options);
    this.transport = createTransport(options, makeFetchTransport);
  }

  sendEvent(_exception, _hint) {
    const { _dsn } = this._options;

    const errorInfo = {
      dsn: _dsn,
    };

    const {
      tag,
      level = 'warn',
      type = 'aegis',
      message = 'error message',
      name = 'todo',
      url = location.search,
    } = _exception;
    logger.info(_hint);

    const envelope = {
      type,
      level,
      message,
      name,
      customTag: tag,
      time: Date.now(),
      url,
      ...errorInfo,
    };
    return this.transport.send(envelope);
  }

  captureException(_exception, _hint) {
    // handle exceptiono
    return this.sendEvent(_exception, _hint);
  }
}

export { getCurrentHub };
