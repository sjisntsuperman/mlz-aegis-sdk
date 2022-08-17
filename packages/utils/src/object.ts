import { isNodeEnv } from './node';

const fallbackGlobalObject = {};

export function getGlobalObject<T>(): T {
  return (isNodeEnv() ? global : typeof window !== 'undefined' ? window : fallbackGlobalObject) as T;
}

export function fill(global, key, cb) {
  const origin = global[key] as () => void;
  const wrapped = cb(origin);
  if (typeof origin == 'function') {
    try {
      wrapFunc(origin, wrapped);
    } catch (error) {
      // _sendAndCapture(error);
    }
  }
  global[key] = wrapped;
}
