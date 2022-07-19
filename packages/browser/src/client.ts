import { createTransport } from './transport';
import { makeFetchTransport } from './transport/fetch';
import { getCurrentHub, BaseClient } from '@aegis-web-sdk/core';
import { isError } from '@aegis-web-sdk/utils';

export class Client implements BaseClient {
  transport: any;
  constructor(options) {
    this.transport = createTransport(options, makeFetchTransport);
  }

  sendEvent(ex, hint) {
    const errorInfo = {};
    // if (isError(ex)) {
    //   errorInfo = extractErrorStack(ex, level);
    // }
    const error = {
      //   type: ErrorTypes.LOG,
      //   level,
      //   message: unknownToString(message),
      //   name: MitoLog,
      //   customTag: unknownToString(tag),
      //   time: getTimestamp(),
      //   url: getLocationHref(),
      ...errorInfo,
    };
    return this.transport.send(error, hint);
  }

  captureException(_exception, _hint) {
    // handle exceptiono
    return this.sendEvent(_exception, _hint);
  }
}

export { getCurrentHub };
