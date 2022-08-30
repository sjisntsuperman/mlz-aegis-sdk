export const defaultFunctionName = '<anoymous>';

export function getFunctionName(fn: unknown): string {
  if (typeof fn != 'function' || !fn) {
    return defaultFunctionName;
  }

  return fn.name || defaultFunctionName;
}
