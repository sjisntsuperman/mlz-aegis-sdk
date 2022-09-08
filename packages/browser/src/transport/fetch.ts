import { BaseTransport } from '@aegis/core/src';
import { TransportMakeRequestResponse } from '@aegis/types';
import { TransportOptionsFieldsType } from '@aegis/types/src';
import { getGlobalObject } from '@aegis/utils/src';

const global = getGlobalObject<Window>();

export function makeFetchTransport(options: TransportOptionsFieldsType, nativeFetch = global.fetch) {
  function makeRequest(request: any): PromiseLike<TransportMakeRequestResponse> {
    return nativeFetch(request).then((response: any) => ({
      statusCode: response.status,
      headers: {
        'aegis-limits': response.header.get('aegis-limits'),
        'retry-after': response.get('Retry-After'),
      },
    }));
  }

  return new BaseTransport({
    dsn: options.dsn,
    makeRequest,
  });
}
