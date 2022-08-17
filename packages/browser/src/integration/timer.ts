import { getGlobalObject, getFunctionName } from '@aegis/utils';

export const timerHandler = {
  name: 'timer',
  monitor(notify) {
    const global = getGlobalObject();
    _wrapTimeFunction(global[setTimeout], notify);
    _wrapTimeFunction(global[setInterval], notify);
  },
  transfrom(data) {
    return {};
  },
  consumer(result) {
    this.transport.send(result);
  },
};

function _wrapTimeFunction(original: () => void, notify: (data?: any) => void): () => number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]): number {
    const originalCallback = args[0];
    notify();
    // args[0] = wrap(originalCallback, {
    //   mechanism: {
    //     data: { function: getFunctionName(original) },
    //     handled: true,
    //     type: 'instrument',
    //   },
    // });
    return original.apply(this, args);
  };
}

function _wrapRAF(original: any): (callback: () => void) => any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, callback: () => void): () => void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return original.apply(this, [
      // wrap(callback, {
      //   mechanism: {
      //     data: {
      //       function: 'requestAnimationFrame',
      //       handler: getFunctionName(original),
      //     },
      //     handled: true,
      //     type: 'instrument',
      //   },
      // }),
    ]);
  };
}
