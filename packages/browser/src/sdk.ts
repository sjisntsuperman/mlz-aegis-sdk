import { makeFetchTransport, makeXHRTransport } from './transport';
import { isSupperFetch } from '@aegis-web-sdk/utils';

export function init(clientOpt) {
  return {
    transport: isSupportFetch() ? makeFetchTransport : makeXHRTransprt,
  };
}

init();
