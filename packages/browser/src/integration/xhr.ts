import { wrap, getFunctionName, getOriginalFunction } from '@aegis/utils';

export const xhrHandler = {
  name: 'xhr',
  monitor(notify) {},
  transform(data) {},
  consumer(result) {},
};

function _wrapXHR(originalSend: () => void): () => void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: XMLHttpRequest, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const xhr = this;
    const xmlHttpRequestProps: XMLHttpRequestProp[] = ['onload', 'onerror', 'onprogress', 'onreadystatechange'];

    xmlHttpRequestProps.forEach(prop => {
      if (prop in xhr && typeof xhr[prop] === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fill(xhr, prop, function (original: WrappedFunction): () => any {
          const wrapOptions = {
            mechanism: {
              data: {
                function: prop,
                handler: getFunctionName(original),
              },
              handled: true,
              type: 'instrument',
            },
          };

          // If Instrument integration has been called before TryCatch, get the name of original function
          const originalFunction = getOriginalFunction(original);
          if (originalFunction) {
            wrapOptions.mechanism.data.handler = getFunctionName(originalFunction);
          }

          // Otherwise wrap directly
          return wrap(original, wrapOptions);
        });
      }
    });

    return originalSend.apply(this, args);
  };
}
