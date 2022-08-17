import { makeFetchTransport, makeXHRTransport } from './transport';
import { isSupperFetch } from '@aegis/utils';

export function init(clientOpt) {
  return {
    transport: isSupperFetch() ? makeFetchTransport : makeXHRTransport,
  };
}

init();
