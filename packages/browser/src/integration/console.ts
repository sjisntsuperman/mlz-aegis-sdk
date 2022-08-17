import { getGlobalObject } from '@aegis/utils';

const global = getGlobalObject();

export const ConsoleHandler = {
  name: 'console',
  monitor(notify) {
    if ('console' in global) {
      return;
    }
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
    logType.forEach(function (level: string): void {
      if (!(level in global.console)) return;
      replaceOld(global.console, level, function (originalConsole: () => any): Function {
        return function (...args: any[]): void {
          if (originalConsole) {
            notify('console', { args, level });
            originalConsole.apply(global.console, args);
          }
        };
      });
    });
  },
  transform(target) {
    return {};
  },
  consumer(data) {
    this.transport.send(data);
  },
};
