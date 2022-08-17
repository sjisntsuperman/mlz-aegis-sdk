import { nativeTrycatch, logger } from '@aegis-web-sdk/utils/src';

type MonitorCallback = (data: any) => void;

export class Subscribe {
  private dep = new Map<string, MonitorCallback[]>();

  watch(name: string, fns: any) {
    this.dep.set(name, fns);
  }

  notify<T>(name: string, data: <T>) {
    const fns = this.dep.get(name);
    if (!fns) return;
    fns.forEach(fn => {
      nativeTrycatch(
        () => {
          fn(data);
        },
        (err: Error) => {
          logger.error('subcribe error: ', err);
        },
      );
    });
  }
}
