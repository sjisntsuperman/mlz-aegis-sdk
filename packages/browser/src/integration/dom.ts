import { BaseHandlerType } from '@aegis/types';
import { WrappedFunction } from '@aegis/types/src';
import { getGlobalObject, getFunctionName, fill, wrap } from '@aegis/utils';

export const DOMhandler: BaseHandlerType = {
  name: 'dom',
  monitor(notify) {
    _wrapEventTarget('click', notify);
  },
  transform(target) {
    return target.error;
  },
  consumer(data) {
    this.transport.send(data);
  },
};

function _wrapEventTarget(target: string, notify: (eventName, data?: any) => void): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = getGlobalObject() as { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const proto = global[target] && global[target].prototype;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
  if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
    return;
  }

  fill(proto, 'addEventListener', function (original: () => void): (
    eventName: string,
    fn: EventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => void {
    return function (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this: any,
      eventName: string,
      fn: EventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): (eventName: string, fn: EventListenerObject, capture?: boolean, secure?: boolean) => void {
      return original.apply(this, [
        eventName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wrap(fn as any),
        options,
      ]);
    };
  });

  fill(
    proto,
    'removeEventListener',
    function (
      originalRemoveEventListener: () => void,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): (this: any, eventName: string, fn: EventListenerObject, options?: boolean | EventListenerOptions) => () => void {
      return function (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this: any,
        eventName: string,
        fn: EventListenerObject,
        options?: boolean | EventListenerOptions,
      ): () => void {
        const wrappedEventHandler = fn as unknown as WrappedFunction;
        try {
          const originalEventHandler = wrappedEventHandler;
          if (originalEventHandler) {
            originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
      };
    },
  );
}
