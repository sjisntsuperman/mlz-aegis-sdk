import { isNodeEnv } from './node';

const fallbackGlobalObject = {};

export function getGlobalObject<T>(): T {
  return (isNodeEnv() ? global : typeof window !== 'undefined' ? window : fallbackGlobalObject) as T;
}

export function fill(global: any, key: string, cb: (data: any) => any) {
  const origin = global[key] as () => void;
  const wrapped = cb(origin);
  if (typeof origin == 'function') {
    try {
      wrapFunc(wrapped, origin);
    } catch (error) {
      // _sendAndCapture(error);
    }
  }
  global[key] = wrapped;
}

export function wrapFunc(wrapped: any, original: any) {
  const proto = original.prototype || {};
  wrapped.prototype = original.prototype = proto;
}
