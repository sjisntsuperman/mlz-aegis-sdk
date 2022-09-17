import { BaseTransport } from '@aegis/core/src';
import { TransportMakeRequestResponse } from '@aegis/types';

export function makeFetchTransport(options: any, nativeFetch: (request: any, options: any) => PromiseLike<unknown>) {
  function makeRequest(request: any): PromiseLike<TransportMakeRequestResponse> {
    const requestOptions: RequestInit = {
      body: JSON.stringify(request.body),
      method: 'POST',
      referrerPolicy: 'origin',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        ...options?.headers
      },
      keepalive: request.body.length <= 65536,
      ...options.fetchOptions,
    };
    return nativeFetch(options.dsn, requestOptions).then((response: any) => ({
          statusCode: response.status,
        })
    );
  }

  return new BaseTransport({
    dsn: options.dsn,
    makeRequest,
  });
}