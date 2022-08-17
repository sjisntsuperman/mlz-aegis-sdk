export function isNodeEnv() {
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === 'process object';
}
