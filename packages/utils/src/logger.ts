export const CONSOLE_LEVELS = ['debug', 'info', 'warn', 'error', 'log', 'assert', 'trace'] as const;

type LoggerMethod = (...args: unknown[]) => void;
type LoggerConsoleMethods = Record<typeof CONSOLE_LEVELS[number], LoggerMethod>;

/** JSDoc */
interface Logger extends LoggerConsoleMethods {
  disable(): void;
  enable(): void;
}

function consoleSandBox<T>(fn: () => T) {
  const global = window;
  const originalConsole = global.console as Console & Record<string, unknown>;
  const wrappedLevels: Partial<LoggerConsoleMethods> = {};

  // restore
  CONSOLE_LEVELS.forEach(
    level =>
      // const originalWrappedFunc =
      (wrappedLevels[level] = originalConsole[level] as LoggerConsoleMethods[typeof level]),
  );

  try {
    return fn();
  } finally {
    Object.keys(wrappedLevels).forEach(level => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      originalConsole[level] = wrappedLevels[level] as typeof CONSOLE_LEVELS[number];
    });
  }
}

function makeLogger(): Logger {
  let enable = false;
  const logger: Partial<Logger> = {
    enable() {
      enable = true;
    },
    disable() {
      enable = false;
    },
  };
  CONSOLE_LEVELS.forEach(name => {
    logger[name] = (...args: any[]) => {
      if (enable) {
        consoleSandBox(global.console[name](`Logger [${name}:]`, ...args) as any);
      }
    };
  });
  return logger as Logger;
}

const logger: Logger = makeLogger();

export { logger };
