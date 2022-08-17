import { nativeTrycatch } from '@aegis/utils/src';
import { Subscribe } from './subscribe';

export type ClientOptions = {
  dsn: string;
  transport: () => void;
};

export abstract class BaseClient {
  public _options: ClientOptions;
  public _transport: unknown = null;
  public _dsn = '';

  constructor(options: ClientOptions) {
    this._options = options;
    if (options.dsn) {
      this._dsn = options.dsn;
    }
  }

  public use(plugins: any[]) {
    const sub = new Subscribe();
    plugins.forEach(plugin => {
      plugin.monitor.call(this, sub.notify.bind(sub));
      const wrapFn = (...args: any[]) => {
        const result = plugin.transform.call(this, args);
        plugin.consumer.call(this, result);
      };
      sub.watch(plugin.name, wrapFn);
    });
  }
}
