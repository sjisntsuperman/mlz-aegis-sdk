import { supportsFetch, logger, getGlobal, fill } from '@aegis/utils';

const global = getGlobal();

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
    }).then(null, error => {
      logger.error(error);
    });
  }
}

export function wrapFunc(wrapped, original) {
  const proto = original.prototype || {};
  wrapped.prototype = original.prototype = proto;
}

fill(global, 'fetch', originalFetch => {
  return function (...args) {
    return originalFetch
      .apply(global, args)
      .then(res => {
        logger.info('fetch:', res);
      })
      .catch(err => {
        logger.info('fetch error:', err);
      });
  };
});
