import { BaseHandlerType } from '@aegis/types';
import { NotifyFieldsType, WrappedFunction, XMLHttpRequestProp } from '@aegis/types/src';
import { wrap, getFunctionName, fill, getGlobalObject } from '@aegis/utils';

export const xhrHandler: BaseHandlerType = {
  name: 'xhr',
  monitor(notify) {
    const global = getGlobalObject<Window>() as any;
    _wrapXHR(global['XMLHttpRequest']['send'], notify);
  },
  transform(data) {
    return data;
  },
  consumer(result) {
    this.transport.send(result);
  },
};

function _wrapXHR(originalSend: () => void, notify: NotifyFieldsType): () => void {
  return function (this: XMLHttpRequest, ...args: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const xhr = this;
    const xmlHttpRequestProps: XMLHttpRequestProp[] = ['onload', 'onerror', 'onprogress', 'onreadystatechange'];

    xmlHttpRequestProps.forEach(prop => {
      if (prop in xhr && typeof xhr[prop] === 'function') {
        fill(xhr, prop, function (original: WrappedFunction) {
          notify(getFunctionName(original), {
            handled: true,
            type: 'instrument',
            function: prop,
          });

          return wrap(original);
        });
      }
    });

    return originalSend.apply(this, args);
  };
}
