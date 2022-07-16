export const CONSOLE_LEVELS = ['debug', 'info', 'warn', 'error', 'log', 'assert', 'trace'] as const;

function consoleSandBox(fn: () => void) {
  const global = window;
  const originalConsole = global.console as Console & Record<string, unknown>;
  const wrappedLevels = {} as any;

  // restore
  CONSOLE_LEVELS.forEach(
    level =>
      // const originalWrappedFunc =
      (wrappedLevels[level] = originalConsole[level]),
  );

  try {
    return fn();
  } finally {
    Object.keys(wrappedLevels).forEach(level => (originalConsole[level] = wrappedLevels[level]));
  }
}

function makeLogger() {
  const logger = {} as any;
  CONSOLE_LEVELS.forEach(name => {
    logger[name] = (...args: any[]) => {
      consoleSandBox(logger[name](`PREFIX ${name}`, ...args));
    };
  });
}

const logger = makeLogger();

export { logger };
