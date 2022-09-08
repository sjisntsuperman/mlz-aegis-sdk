import { BaseHandlerType } from '@aegis/types';
import { fill, getGlobalObject } from '@aegis/utils';

const global = getGlobalObject<any>();

export const ConsoleHandler: BaseHandlerType = {
  name: 'console',
  monitor(notify) {
    if ('console' in global) {
      return;
    }
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
    logType.forEach(function (level: string): void {
      if (!(level in global.console)) return;
      fill(global.console, level, function (originalConsole: () => any): any {
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
    return target;
  },
  consumer(data) {
    this.transport.send(data);
  },
};
