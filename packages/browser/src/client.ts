import { makeFetchTransport } from './transport/fetch';
import { BaseClient, BaseTransport } from '@aegis/core/src';
import { getLocationHref, getTimestamp } from '@aegis/utils/src';
import { BrowserOptionsFieldsType, LogTypes } from '@aegis/types/src';
import { makeDsn } from './utils';

export class BrowserClient extends BaseClient {
  transport: BaseTransport;
  _options: BrowserOptionsFieldsType;
  constructor(options: BrowserOptionsFieldsType) {
    super(options);
    this._options = {
      ...options,
    };
    this.transport = makeFetchTransport(
      {
        ...options,
        dsn: makeDsn(options.dsn),
      },
      fetch,
    );
  }

  // 手动上报
  public log(data: LogTypes) {
    const { name = 'log', message = '', type = 'normal', level = 'info' } = data;

    const error = {
      type,
      level,
      message,
      name,
      url: getLocationHref(),
      time: getTimestamp(),
    };

    const requestOptions = {
      url: this._dsn,
      methods: 'POST',
      data: error,
    };

    this.transport.send(requestOptions);
  }
}
