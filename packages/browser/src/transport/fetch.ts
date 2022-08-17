import { createTransport } from '@aegis/core';

export function makeFetchTransport(options, nativeFetch) {
  function makeRequest(request) {
    const requestOptions = {};
    return nativeFetch(requestOptions).then(response => ({
      statusCode: response.status,
      headers: {
        'aegis-limits': response.header.get('aegis-limits'),
        'retry-after': response.get('Retry-After'),
      },
    }));
  }
  return createTransport(options, makeRequest);
}
