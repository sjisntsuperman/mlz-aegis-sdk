import { BaseTransport } from '@aegis/core/src';
import { TransportOptionsFieldsType } from '@aegis/types/src';

const XHR_READYSTATE_DONE = 4;

export function makeXHRTransport(options: TransportOptionsFieldsType) {
  function makeRequest(request: unknown): PromiseLike<unknown> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = reject;

      xhr.onreadystatechange = (): void => {
        if (xhr.readyState === XHR_READYSTATE_DONE) {
          resolve({
            statusCode: xhr.status,
            headers: {
              'aegis-limits': xhr.getResponseHeader('aegis-limits'),
              'retry-after': xhr.getResponseHeader('Retry-After'),
            },
          });
        }
      };

      xhr.open('POST', options.url);

      for (const header in options.headers) {
        if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }

      xhr.send(request.body);
    });
  }

  return new BaseTransport({
    makeRequest,
    dsn: options.dsn,
  });
}
