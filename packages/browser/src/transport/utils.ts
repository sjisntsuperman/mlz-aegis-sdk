import { logger, getGlobalObject, fill, supportsFetch } from '@aegis/utils/src';

const global = getGlobalObject<Window>();

export function sendReport(url: string, body: string | Uint8Array): void {
  const isRealNavigator = Object.prototype.toString.call(global && global.navigator) === '[object Navigator]';
  const hasSendBeacon = isRealNavigator && typeof global.navigator.sendBeacon === 'function';

  if (hasSendBeacon) {
    // Prevent illegal invocations - https://xgwang.me/posts/you-may-not-know-beacon/#it-may-throw-error%2C-be-sure-to-catch
    const sendBeacon = global.navigator.sendBeacon.bind(global.navigator);
    sendBeacon(url, body);
  } else if (supportsFetch()) {
    const fetch = global.fetch;
    fetch(url, {
      body,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    }).then(null, (error: unknown) => {
      logger.error(error);
    });
  }
}

export function wrapFunc(wrapped: { prototype: any; }, original: { prototype: {}; }) {
  const proto = original.prototype || {};
  wrapped.prototype = original.prototype = proto;
}

fill(global, 'fetch', originalFetch => {
  return function (...args: any) {
    return originalFetch
      .apply(global, args)
      .then((res: unknown) => {
        logger.info('fetch:', res);
      })
      .catch((err: unknown) => {
        logger.info('fetch error:', err);
      });
  };
});
