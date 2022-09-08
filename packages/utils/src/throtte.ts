export function throttle(fn: any, timeout?: number): () => void {
  let enable = true;
  return function (...args) {
    if (!enable) return;
    enable = false;
    setTimeout(() => {
      typeof fn == 'function' && fn(args);
      enable = true;
    }, timeout);
  };
}
