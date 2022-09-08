import { makeFetchTransport } from './transport/fetch';
import { BaseClient, BaseTransport } from '@aegis/core/src';
import { getLocationHref, getTimestamp } from '@aegis/utils/src';
import { BrowserOptionsFieldsType, LogTypes } from '@aegis/types/src';
import { makeDsn } from './utils';
import { makeXHRTransport } from './transport';
import { getGlobalObject } from '@aegis/utils';

export class BrowserClient extends BaseClient {
  transport: BaseTransport;
  options: BrowserOptionsFieldsType;
  constructor(options: BrowserOptionsFieldsType) {
    super(options);
    this.options = {
      ...options,
    };

    const transportOptions = {
      ...options,
      dsn: makeDsn(options.dsn),
    };

    const global = getGlobalObject<Window>();

    // 降级处理
    this.transport =
      typeof global['fetch'] == 'function'
        ? makeFetchTransport(transportOptions, fetch)
        : makeXHRTransport(transportOptions);
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
      url: this.options.dsn,
      methods: 'POST',
      data: error,
    };

    this.transport.send(requestOptions);
  }
}
