import { BaseHandlerType } from '@aegis/types';
import { NotifyFieldsType } from '@aegis/types/src';
import { getGlobalObject, getFunctionName } from '@aegis/utils';

export const timerHandler: BaseHandlerType = {
  name: 'timer',
  monitor(notify) {
    const global = getGlobalObject<Window>();
    _wrapTimeFunction(global['setTimeout'], notify);
    _wrapTimeFunction(global['setInterval'], notify);
  },
  transform(data) {
    return data;
  },
  consumer(result) {
    this.transport.send(result);
  },
};

export const rafHandler: BaseHandlerType = {
  name: 'raf',
  monitor(notify) {
    const global = getGlobalObject<Window>();
    _wrapRAF(global['requestAnimationFrame'], notify);
  },
  transform(collectedData) {
    return collectedData;
  },
  consumer(transformedData) {
    this.transport.send(transformedData);
  },
};

function _wrapTimeFunction(original: any, notify: NotifyFieldsType): () => number {
  return function (this: any, ...args: any[]): number {
    const originalCallback = args[0];
    notify(getFunctionName(original), {
      handled: true,
      type: 'instrument',
      originalCallback,
    });
    return original.apply(this, args);
  };
}

function _wrapRAF(original: any, notify: NotifyFieldsType): (callback: () => void) => any {
  return function (this: any, callback: () => void): () => void {
    notify(getFunctionName(original), {
      data: {
        function: 'requestAnimationFrame',
      },
      handled: true,
      type: 'instrument',
    });
    return original.apply(this);
  };
}
