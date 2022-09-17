import { BaseTransport } from '@aegis/core/src';
import { TransportMakeRequestResponse } from '@aegis/types/src';

const XHR_READYSTATE_DONE = 4;

export function makeXHRTransport(options: any) {
  function makeRequest(request: any): PromiseLike<TransportMakeRequestResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = reject;

      xhr.onreadystatechange = (): void => {
        if (xhr.readyState === XHR_READYSTATE_DONE) {
          resolve({
            statusCode: xhr.status
          });
        }
      };

      xhr.open('POST', options?.url || options.dsn);

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
