import { getLocationHref, getGlobalObject, getTimestamp } from '@aegis/utils';

const global = getGlobalObject();

export const enum ErrorTypes {
  UNKNOWN = 'UNKNOWN',
  UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
  JAVASCRIPT = 'JAVASCRIPT',
  LOG = 'LOG',
  HTTP = 'HTTP',
  VUE = 'VUE',
  REACT = 'REACT',
  RESOURCE = 'RESOURCE',
  PROMISE = 'PROMISE',
  ROUTE = 'ROUTE',
}

export const ErrorHandler = {
  name: 'error',
  monitor(notify: any) {
    const handler = (event: ErrorEvent) => {
      notify(event.error);
    };
    global.addEventListener('error', handler, true);
  },
  transform(target: any) {
    if (target.localName) {
      return _getResourceMessage(target);
    }
    return _getCodeErrorMessage(target);
  },
  consumer(data: any) {
    this.transport.send(data);
  },
};

function _getResourceMessage(target) {
  return {
    type: ErrorTypes.RESOURCE,
    url: getLocationHref(),
    message: target.src + target.href,
    level: 'low',
    time: getTimestamp(),
    name: target.localName,
  };
}

function _getCodeErrorMessage(target) {
  return {
    type: ErrorTypes.RESOURCE,
    url: getLocationHref(),
    message: target.src + target.href,
    level: 'low',
    time: getTimestamp(),
    name: target.localName,
  };
}

export const UnhandledRejectionHandler = {
  name: 'unhandlerrejection',
  monitor(notify) {
    const _unhandledrejectionHanlder = event => {
      notify(event);
    };
    global.addEventListener('unhandledrejection', _unhandledrejectionHanlder, true);
  },
  transform(target: any) {
    let error = target;
    try {
      error = target.reason;
    } catch (e) {
      // do nothing
    }
    return {
      type: ErrorTypes.PROMISE,
      message: error,
      url: getLocationHref(),
      name: target.type,
      time: getTimestamp(),
      level: 'low',
    };
  },
  consumer(data) {
    this.transport.send(data);
  },
};
